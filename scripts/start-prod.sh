#!/usr/bin/env bash

set -Eeuo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
app_dir="$(cd -- "${script_dir}/.." && pwd)"

beam_path_host="${BEAM_PATH_HOST:-127.0.0.1}"
beam_path_port="${BEAM_PATH_PORT:-3000}"
force_build=0

usage() {
  echo "Usage: ./scripts/start-prod.sh [--build]"
  echo
  echo "  --build  Reinstall dependencies and rebuild before starting."
  echo
  echo "Environment:"
  echo "  BEAM_PATH_HOST  Bind address (default: 127.0.0.1)"
  echo "  BEAM_PATH_PORT  Listen port (default: 3000)"
}

case "${1:-}" in
  "")
    ;;
  --build)
    force_build=1
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

if [[ ! "${beam_path_port}" =~ ^[0-9]+$ ]] ||
  ((beam_path_port < 1 || beam_path_port > 65535)); then
  echo "BEAM_PATH_PORT must be an integer from 1 to 65535." >&2
  exit 1
fi

cd "${app_dir}"

if ((force_build == 1)) || [[ ! -d dist ]]; then
  npm ci
  npm run build
fi

export NODE_ENV=production
export VINEXT_TRUST_PROXY="${VINEXT_TRUST_PROXY:-1}"

exec npm run start -- \
  --hostname "${beam_path_host}" \
  --port "${beam_path_port}"
