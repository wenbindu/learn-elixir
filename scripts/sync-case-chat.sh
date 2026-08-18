#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "${script_dir}/.." && pwd)"
source_dir="${CASE_CHAT_SOURCE:-${project_root}/../dsh-ws/voice_chat_tutorial}"
target_dir="${project_root}/public/case-chat"

for filename in index.html styles.css engine.js; do
  if [[ ! -f "${source_dir}/${filename}" ]]; then
    echo "Missing Case Chat file: ${source_dir}/${filename}" >&2
    exit 1
  fi
done

mkdir -p "${target_dir}"
cp \
  "${source_dir}/index.html" \
  "${source_dir}/styles.css" \
  "${source_dir}/engine.js" \
  "${target_dir}/"

echo "Case Chat synced to ${target_dir}"
