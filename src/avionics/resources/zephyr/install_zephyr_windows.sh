#!/usr/bin/env bash
# Zephyr RTOS setup script for Windows (Git Bash + Chocolatey)
#
# Requirements before running:
#   1. Git for Windows (https://git-scm.com/download/win) — provides Git Bash
#   2. Chocolatey package manager (https://chocolatey.org/install)
#      Install from an ADMIN PowerShell:
#        Set-ExecutionPolicy Bypass -Scope Process -Force; `
#        [System.Net.ServicePointManager]::SecurityProtocol = 3072; `
#        iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
#   3. Run this script from Git Bash (NOT PowerShell or cmd.exe)
#
# NOTE: WSL2 (Windows Subsystem for Linux) is an excellent alternative.
#       If using WSL2, run install_zephyr_linux.sh inside your WSL2 distro instead.
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log()  { echo -e "${BLUE}[INFO]${NC} $*"; }
ok()   { echo -e "${GREEN}[ OK ]${NC} $*"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
die()  { echo -e "${RED}[ERR ]${NC} $*" >&2; exit 1; }

# --- Configuration (override via environment variables) ---
SDK_VERSION="${ZEPHYR_SDK_VERSION:-0.16.8}"
ZEPHYR_DIR="${ZEPHYR_BASE:-$HOME/zephyrproject}"
SDK_TOOLCHAIN="${ZEPHYR_TOOLCHAIN:-arm-zephyr-eabi}"  # use 'all' for every toolchain

SDK_INSTALLER="zephyr-sdk-${SDK_VERSION}_windows-x86_64.7z"
SDK_URL="https://github.com/zephyrproject-rtos/sdk-ng/releases/download/v${SDK_VERSION}/${SDK_INSTALLER}"
SDK_DIR="$HOME/zephyr-sdk-${SDK_VERSION}"

echo ""
log "=== Zephyr RTOS Windows Installer (Git Bash) ==="
log "SDK version  : $SDK_VERSION"
log "Workspace    : $ZEPHYR_DIR"
log "SDK dir      : $SDK_DIR"
log "Toolchain    : $SDK_TOOLCHAIN"
echo ""

# --- Verify Git Bash environment ---
if [[ "$OSTYPE" != "msys" && "$OSTYPE" != "cygwin" ]]; then
    die "This script must be run in Git Bash (MSYS2) on Windows. OSTYPE=$OSTYPE"
fi

# --- Check for Chocolatey ---
CHOCO_CMD=""
if command -v choco &>/dev/null; then
    CHOCO_CMD="choco"
elif [ -f "/c/ProgramData/chocolatey/bin/choco.exe" ]; then
    CHOCO_CMD="/c/ProgramData/chocolatey/bin/choco.exe"
else
    die "Chocolatey not found. Install it from an ADMIN PowerShell:\n\
  Set-ExecutionPolicy Bypass -Scope Process -Force; \\\n\
  iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))\n\
Then reopen Git Bash and re-run this script."
fi
ok "Chocolatey found."

# --- Install system dependencies via Chocolatey ---
# Chocolatey requires elevation; the /y flag auto-confirms
log "Installing dependencies via Chocolatey (may prompt for UAC)..."
"$CHOCO_CMD" install -y cmake --installargs 'ADD_CMAKE_TO_PATH=System' || warn "cmake install may have failed, continuing..."
"$CHOCO_CMD" install -y ninja python3 7zip wget git || warn "Some packages may have failed, continuing..."
ok "System dependencies installed (restart Git Bash if PATH changes aren't visible)."

# Refresh PATH so newly installed tools are visible
export PATH="/c/ProgramData/chocolatey/bin:$PATH"
export PATH="/c/Program Files/CMake/bin:$PATH"
export PATH="/c/Python3*/Scripts:$PATH"

# --- Python virtual environment ---
PYTHON_CMD=""
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    die "Python not found. Ensure Chocolatey installed it and restart Git Bash."
fi

log "Creating Python venv at $ZEPHYR_DIR/.venv..."
mkdir -p "$ZEPHYR_DIR"
"$PYTHON_CMD" -m venv "$ZEPHYR_DIR/.venv"
# shellcheck source=/dev/null
source "$ZEPHYR_DIR/.venv/Scripts/activate"   # Windows venv uses Scripts/, not bin/
pip install --upgrade pip --quiet

# --- West ---
if ! command -v west &>/dev/null; then
    log "Installing West..."
    pip install west --quiet
else
    ok "West already installed: $(west --version)"
fi

# --- Zephyr workspace ---
if [ ! -f "$ZEPHYR_DIR/.west/config" ]; then
    log "Initializing Zephyr workspace (this clones Zephyr — may take a while)..."
    west init "$ZEPHYR_DIR"
else
    ok "Zephyr workspace already initialized."
fi

cd "$ZEPHYR_DIR"
log "Running 'west update' (downloads all Zephyr modules — may take a while)..."
west update
west zephyr-export
ok "Zephyr workspace updated."

log "Installing Zephyr Python requirements..."
pip install -r "$ZEPHYR_DIR/zephyr/scripts/requirements.txt" --quiet
ok "Python requirements installed."

# --- Zephyr SDK ---
if [ ! -d "$SDK_DIR" ]; then
    log "Downloading Zephyr SDK v${SDK_VERSION} for Windows..."
    wget -q --show-progress "$SDK_URL" -O "/tmp/$SDK_INSTALLER"

    log "Extracting SDK (using 7-Zip)..."
    7z x "/tmp/$SDK_INSTALLER" -o"$HOME" -y > /dev/null
    rm "/tmp/$SDK_INSTALLER"

    log "Running SDK setup (toolchain: $SDK_TOOLCHAIN)..."
    cd "$SDK_DIR"
    ./setup.sh -t "$SDK_TOOLCHAIN" -h -c
    ok "Zephyr SDK installed at $SDK_DIR."
else
    ok "Zephyr SDK already installed at $SDK_DIR."
fi

# --- Persist venv activation in .bashrc ---
VENV_LINE="source $ZEPHYR_DIR/.venv/Scripts/activate"
if ! grep -qF "$VENV_LINE" ~/.bashrc 2>/dev/null; then
    { echo ""; echo "# Zephyr RTOS"; echo "$VENV_LINE"; } >> ~/.bashrc
    ok "Venv activation added to ~/.bashrc."
fi

echo ""
ok "=========================================="
ok "  Zephyr RTOS installation complete!"
ok "=========================================="
echo ""
echo "  Workspace : $ZEPHYR_DIR"
echo "  SDK       : $SDK_DIR"
echo "  venv      : $ZEPHYR_DIR/.venv"
echo ""
echo "To activate in a new Git Bash shell:"
echo "  source $ZEPHYR_DIR/.venv/Scripts/activate"
echo ""
echo "To build the hello_world sample:"
echo "  cd $ZEPHYR_DIR/zephyr"
echo "  west build -b <your_board> samples/hello_world"
echo ""
echo "NOTE: For flashing firmware, install ST-Link, J-Link, or openocd via Chocolatey:"
echo "  choco install openocd"
echo ""
