#!/usr/bin/env bash

set -Eeuo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
app_dir="$(cd -- "${script_dir}/.." && pwd)"
beam_path_config="${BEAM_PATH_CONFIG:-${app_dir}/config/local.env}"
runtime_dir="${app_dir}/.run"
pid_file="${runtime_dir}/beam-path.pid"
log_file="${runtime_dir}/beam-path.log"
host_override="${BEAM_PATH_HOST:-}"
port_override="${BEAM_PATH_PORT:-}"

usage() {
  echo "Usage: ./scripts/start-local.sh [command]"
  echo
  echo "Commands:"
  echo "  start       Start in the background (default)"
  echo "  stop        Stop the managed development server"
  echo "  restart     Restart the managed development server"
  echo "  status      Show the current server status"
  echo "  logs        Follow the development server log"
  echo "  foreground  Run interactively; stop with Ctrl+C"
  echo
  echo "Configuration:"
  echo "  BEAM_PATH_CONFIG  Config file (default: config/local.env)"
  echo "  BEAM_PATH_HOST    Bind address (default: 127.0.0.1)"
  echo "  BEAM_PATH_PORT    Listen port (default: 3000)"
}

if [[ -f "${beam_path_config}" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "${beam_path_config}"
  set +a
fi

beam_path_host="${host_override:-${BEAM_PATH_HOST:-127.0.0.1}}"
beam_path_port="${port_override:-${BEAM_PATH_PORT:-3000}}"

if [[ ! "${beam_path_port}" =~ ^[0-9]+$ ]] ||
  ((beam_path_port < 1 || beam_path_port > 65535)); then
  echo "BEAM_PATH_PORT must be an integer from 1 to 65535." >&2
  exit 1
fi

server_url="http://${beam_path_host}:${beam_path_port}"
if [[ "${beam_path_host}" == "0.0.0.0" ]]; then
  server_url="http://127.0.0.1:${beam_path_port}"
fi

ensure_runtime() {
  if ! command -v node >/dev/null 2>&1; then
    echo "Node.js is required (version 22.13.0 or newer)." >&2
    return 1
  fi

  if ! command -v npm >/dev/null 2>&1; then
    echo "npm is required." >&2
    return 1
  fi

  node -e '
    const [major, minor] = process.versions.node.split(".").map(Number);
    if (major < 22 || (major === 22 && minor < 13)) {
      console.error(`Node.js ${process.versions.node} is too old; use 22.13.0 or newer.`);
      process.exit(1);
    }
  '

  cd "${app_dir}"

  if [[ ! -x node_modules/.bin/next ]]; then
    echo "Dependencies are missing; installing from package-lock.json..."
    npm ci
  fi
}

read_managed_pid() {
  local pid

  [[ -f "${pid_file}" ]] || return 1
  IFS= read -r pid <"${pid_file}" || return 1

  if [[ ! "${pid}" =~ ^[0-9]+$ ]]; then
    rm -f "${pid_file}"
    return 1
  fi

  if ! kill -0 "${pid}" 2>/dev/null; then
    rm -f "${pid_file}"
    return 1
  fi

  printf '%s\n' "${pid}"
}

find_listener_pid() {
  local listener_pid

  command -v lsof >/dev/null 2>&1 || return 1
  listener_pid="$(lsof -nP -iTCP:"${beam_path_port}" -sTCP:LISTEN -t 2>/dev/null || true)"
  listener_pid="${listener_pid%%$'\n'*}"

  [[ "${listener_pid}" =~ ^[0-9]+$ ]] || return 1
  printf '%s\n' "${listener_pid}"
}

wait_until_ready() {
  local pid="$1"
  local attempt

  for ((attempt = 1; attempt <= 60; attempt++)); do
    if ! kill -0 "${pid}" 2>/dev/null; then
      echo "Development server failed to start. Last log lines:" >&2
      tail -n 30 "${log_file}" >&2 || true
      rm -f "${pid_file}"
      return 1
    fi

    if curl --silent --show-error --fail \
      --max-time 1 \
      --output /dev/null \
      "${server_url}" 2>/dev/null; then
      return 0
    fi

    sleep 0.1
  done

  echo "Development server did not become ready in time." >&2
  kill -TERM "${pid}" 2>/dev/null || true
  rm -f "${pid_file}"
  return 1
}

start_server() {
  local pid
  local listener_pid

  if pid="$(read_managed_pid)"; then
    echo "BEAM Path is already running (PID ${pid}) at ${server_url}."
    return 0
  fi

  if listener_pid="$(find_listener_pid)"; then
    echo "Port ${beam_path_port} is already used by PID ${listener_pid}." >&2
    echo "Stop that process or change BEAM_PATH_PORT in config/local.env." >&2
    return 1
  fi

  ensure_runtime
  mkdir -p "${runtime_dir}"
  : >"${log_file}"

  nohup "${app_dir}/node_modules/.bin/next" dev \
    --hostname "${beam_path_host}" \
    --port "${beam_path_port}" \
    >>"${log_file}" 2>&1 &
  pid="$!"
  printf '%s\n' "${pid}" >"${pid_file}"

  if ! wait_until_ready "${pid}"; then
    return 1
  fi

  echo "BEAM Path started (PID ${pid}): ${server_url}"
  echo "Logs: ./scripts/start-local.sh logs"
}

stop_server() {
  local pid
  local attempt

  if ! pid="$(read_managed_pid)"; then
    echo "BEAM Path is not running."
    return 0
  fi

  echo "Stopping BEAM Path (PID ${pid})..."
  kill -TERM "${pid}"

  for ((attempt = 1; attempt <= 50; attempt++)); do
    if ! kill -0 "${pid}" 2>/dev/null; then
      rm -f "${pid_file}"
      echo "BEAM Path stopped."
      return 0
    fi
    sleep 0.1
  done

  echo "Process ${pid} did not stop within 5 seconds." >&2
  return 1
}

show_status() {
  local pid
  local listener_pid

  if pid="$(read_managed_pid)"; then
    echo "BEAM Path is running (PID ${pid}): ${server_url}"
    return 0
  fi

  if listener_pid="$(find_listener_pid)"; then
    echo "BEAM Path is not managed by this script." >&2
    echo "Port ${beam_path_port} is occupied by PID ${listener_pid}." >&2
    return 1
  fi

  echo "BEAM Path is stopped."
}

follow_logs() {
  if [[ ! -f "${log_file}" ]]; then
    echo "No log file yet. Start the server first." >&2
    return 1
  fi

  tail -f "${log_file}"
}

run_foreground() {
  local pid
  local listener_pid

  if pid="$(read_managed_pid)"; then
    echo "BEAM Path is already running in the background (PID ${pid})." >&2
    return 1
  fi

  if listener_pid="$(find_listener_pid)"; then
    echo "Port ${beam_path_port} is already used by PID ${listener_pid}." >&2
    return 1
  fi

  ensure_runtime

  exec npm run dev -- \
    --hostname "${beam_path_host}" \
    --port "${beam_path_port}"
}

command="${1:-start}"

case "${command}" in
  start)
    start_server
    ;;
  stop)
    stop_server
    ;;
  restart)
    stop_server
    start_server
    ;;
  status)
    show_status
    ;;
  logs)
    follow_logs
    ;;
  foreground)
    run_foreground
    ;;
  --help|-h|help)
    usage
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac
