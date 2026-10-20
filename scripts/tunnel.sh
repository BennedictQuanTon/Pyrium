#!/usr/bin/env bash
# Serve the Pyrium landing page through a Cloudflare Quick Tunnel.
#
# Quick tunnels need no Cloudflare account: each run prints a fresh
# https://<random>.trycloudflare.com URL and dies when this script exits.
#
# Usage:
#   ./scripts/tunnel.sh              # build if needed, serve on :3100, open tunnel
#   PORT=3200 ./scripts/tunnel.sh    # different local port
#   ./scripts/tunnel.sh --rebuild    # force a fresh production build first
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${PORT:-3100}"
REBUILD="${1:-}"

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "cloudflared is missing. Install it with: brew install cloudflared" >&2
  exit 1
fi

if [[ "$REBUILD" == "--rebuild" || ! -d .next ]]; then
  echo "→ Building production bundle…"
  npx next build
fi

# Free the port if a stale server is still holding it.
if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "→ Port $PORT already in use; reusing the running server."
  START_SERVER=0
else
  START_SERVER=1
fi

if [[ "$START_SERVER" == "1" ]]; then
  echo "→ Starting next start on :$PORT"
  npx next start -p "$PORT" &
  SERVER_PID=$!
  trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
  # Wait for the server to answer before opening the tunnel.
  for _ in $(seq 1 30); do
    if curl -fsS -o /dev/null "http://localhost:$PORT"; then break; fi
    sleep 0.5
  done
fi

echo "→ Opening Cloudflare quick tunnel to http://localhost:$PORT"
echo "  Copy the https://…trycloudflare.com URL printed below. Ctrl-C stops both."
cloudflared tunnel --url "http://localhost:$PORT" --no-autoupdate
