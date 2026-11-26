#!/usr/bin/env bash
# PM Skills in a box: the whole library, the playground and a local AI model on
# one small computer, served over Wi-Fi to phones and laptops nearby, with no
# internet needed after setup. For schools, libraries, clinics and NGOs.
#
# Hardware: a Raspberry Pi 5 (8 GB) with a 64 GB+ card, or any old laptop running
# Debian or Ubuntu. Run once, while online:
#   curl -fsSL https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/box/setup.sh | sudo bash
#   … or from a clone:  sudo bash box/setup.sh [--hotspot] [--model qwen2.5:3b]
#
# --hotspot  also turn the Wi-Fi into an access point named "PM-Skills" (password
#            printed at the end), for places with no network at all.
# --model    the Ollama model to use (default: pm-8b if it is published, else
#            qwen2.5:3b, which runs on a Raspberry Pi 5).
set -euo pipefail
[ "$(id -u)" = 0 ] || { echo "Run with sudo."; exit 1; }
HOTSPOT=0; MODEL="${MODEL:-}"
while [ $# -gt 0 ]; do case "$1" in --hotspot) HOTSPOT=1 ;; --model) MODEL="$2"; shift ;; esac; shift; done
DIR=/opt/pm-skills
say() { echo; echo "== $* =="; }

say "1/6 Packages"
apt-get update -q
apt-get install -y -q git nginx curl avahi-daemon ca-certificates
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && apt-get install -y -q nodejs
fi

say "2/6 The library"
if [ -d "$DIR/.git" ]; then git -C "$DIR" pull -q; else git clone -q --depth 1 https://github.com/mohitagw15856/pm-claude-skills "$DIR"; fi
cd "$DIR"
node web/build-skills.mjs >/dev/null
for s in build-skill-pages build-worked-examples build-overlays build-proven build-i18n-desc build-skill-changes build-ai-at-work-report build-evolution-log; do
  [ -f "scripts/$s.mjs" ] && node "scripts/$s.mjs" >/dev/null 2>&1 || true
done
cp data/risk-tiers.json web/risk-tiers.json 2>/dev/null || true
# Tell the playground it is running in a box: use the local model by default.
echo '{"box": true, "ollama": "/ollama"}' > web/box.json

say "3/6 The local model (Ollama)"
command -v ollama >/dev/null || curl -fsSL https://ollama.com/install.sh | sh
systemctl enable --now ollama >/dev/null 2>&1 || true
mkdir -p /etc/systemd/system/ollama.service.d
printf '[Service]\nEnvironment="OLLAMA_ORIGINS=*"\n' > /etc/systemd/system/ollama.service.d/origins.conf
systemctl daemon-reload && systemctl restart ollama
sleep 3
if [ -z "$MODEL" ]; then MODEL=qwen2.5:3b; ollama pull pm-8b >/dev/null 2>&1 && MODEL=pm-8b || true; fi
ollama pull "$MODEL"
echo "{\"box\": true, \"ollama\": \"/ollama\", \"model\": \"$MODEL\"}" > web/box.json

say "4/6 The web server"
cat > /etc/nginx/sites-available/pm-skills <<NGX
server {
  listen 80 default_server;
  server_name _;
  root $DIR/web;
  index index.html;
  location / { try_files \$uri \$uri/ =404; }
  # The local model, on the same address, so browsers need no extra setup.
  location /ollama/ { proxy_pass http://127.0.0.1:11434/; proxy_read_timeout 600s; proxy_buffering off; }
}
NGX
ln -sf /etc/nginx/sites-available/pm-skills /etc/nginx/sites-enabled/pm-skills
rm -f /etc/nginx/sites-enabled/default
nginx -t -q && systemctl enable --now nginx && systemctl reload nginx

say "5/6 A friendly name"
hostnamectl set-hostname pm-skills 2>/dev/null || true
systemctl restart avahi-daemon 2>/dev/null || true

if [ "$HOTSPOT" = 1 ]; then
  say "6/6 Wi-Fi hotspot"
  PASS="skills-$(tr -dc 'a-z0-9' </dev/urandom | head -c 6)"
  nmcli dev wifi hotspot ifname wlan0 ssid "PM-Skills" password "$PASS" && nmcli connection modify Hotspot connection.autoconnect yes
  echo "Wi-Fi: PM-Skills   password: $PASS"
else
  say "6/6 Done (no hotspot; the box uses the existing network)"
fi
IP=$(hostname -I | awk '{print $1}')
echo
echo "Open on any phone or laptop on the same Wi-Fi:  http://pm-skills.local  (or http://$IP)"
echo "Model: $MODEL. To update later, while online: sudo bash $DIR/box/update.sh"
