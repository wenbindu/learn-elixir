#!/usr/bin/env bash

set -Eeuo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
app_dir="$(cd -- "${script_dir}/.." && pwd)"
beam_path_config="${BEAM_PATH_CONFIG:-${app_dir}/config/local.env}"

usage() {
  echo "Usage: ./scripts/start-local.sh"
  echo
  echo "Starts the Next.js development server with hot reload."
  echo
  echo "Configuration:"
  echo "  BEAM_PATH_CONFIG  Config file (default: config/local.env)"
  echo "  BEAM_PATH_HOST    Bind address (default: 127.0.0.1)"
  echo "  BEAM_PATH_PORT    Listen port (default: 3000)"
}

case "${1:-}" in
  "")
    ;;
  --help|-h)
    usage
    exit 0
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required (version 22.13.0 or newer)." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required." >&2
  exit 1
fi

node -e '
  const [major, minor] = process.versions.node.split(".").map(Number);
  if (major < 22 || (major === 22 && minor < 13)) {
    console.error(`Node.js ${process.versions.node} is too old; use 22.13.0 or newer.`);
    process.exit(1);
  }
'

if [[ -f "${beam_path_config}" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "${beam_path_config}"
  set +a
fi

beam_path_host="${BEAM_PATH_HOST:-127.0.0.1}"
beam_path_port="${BEAM_PATH_PORT:-3000}"

if [[ ! "${beam_path_port}" =~ ^[0-9]+$ ]] ||
  ((beam_path_port < 1 || beam_path_port > 65535)); then
  echo "BEAM_PATH_PORT must be an integer from 1 to 65535." >&2
  exit 1
fi

cd "${app_dir}"

if [[ ! -x node_modules/.bin/next ]]; then
  echo "Dependencies are missing; installing from package-lock.json..."
  npm ci
fi

exec npm run dev -- \
  --hostname "${beam_path_host}" \
  --port "${beam_path_port}"
