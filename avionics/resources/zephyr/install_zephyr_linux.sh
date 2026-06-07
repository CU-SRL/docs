#!/usr/bin/env bash
# Zephyr RTOS setup script for Linux (Ubuntu/Debian, Fedora, Arch)
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

# --- Detect architecture ---
ARCH=$(uname -m)
case $ARCH in
    x86_64)  SDK_ARCH="x86_64" ;;
    aarch64) SDK_ARCH="aarch64" ;;
    *) die "Unsupported architecture: $ARCH" ;;
esac

SDK_INSTALLER="zephyr-sdk-${SDK_VERSION}_linux-${SDK_ARCH}.tar.xz"
SDK_URL="https://github.com/zephyrproject-rtos/sdk-ng/releases/download/v${SDK_VERSION}/${SDK_INSTALLER}"
SDK_DIR="$HOME/zephyr-sdk-${SDK_VERSION}"

echo ""
log "=== Zephyr RTOS Linux Installer ==="
log "SDK version  : $SDK_VERSION"
log "Workspace    : $ZEPHYR_DIR"
log "SDK dir      : $SDK_DIR"
log "Toolchain    : $SDK_TOOLCHAIN"
echo ""

# --- System dependencies ---
log "Installing system dependencies..."
if [ ! -f /etc/os-release ]; then
    die "Cannot detect Linux distribution (no /etc/os-release)"
fi
. /etc/os-release
DISTRO="${ID:-unknown}"

case $DISTRO in
    ubuntu|debian|linuxmint|pop)
        sudo apt-get update -q
        sudo apt-get install -y --no-install-recommends \
            git cmake ninja-build gperf ccache dfu-util \
            device-tree-compiler wget python3-dev python3-pip \
            python3-setuptools python3-tk python3-wheel \
            xz-utils file make gcc gcc-multilib g++-multilib \
            libsdl2-dev libmagic1
        ;;
    fedora)
        sudo dnf install -y cmake ninja-build gperf ccache dfu-util dtc wget \
            python3-devel python3-pip python3-setuptools python3-tkinter \
            xz file make gcc gcc-c++ \
            glibc-devel.i686 libstdc++-devel.i686 SDL2-devel file-libs
        ;;
    arch|manjaro|endeavouros)
        sudo pacman -Syu --noconfirm --needed cmake ninja gperf ccache \
            dfu-util dtc wget python python-pip python-setuptools \
            python-tk xz file make gcc sdl2 libmagic
        ;;
    *)
        warn "Unknown distribution '$DISTRO'. Skipping package install."
        warn "Ensure these are installed: git cmake ninja gperf python3 pip3 dtc wget"
        ;;
esac
ok "System dependencies ready."

# --- Python virtual environment ---
log "Creating Python venv at $ZEPHYR_DIR/.venv..."
mkdir -p "$ZEPHYR_DIR"
python3 -m venv "$ZEPHYR_DIR/.venv"
# shellcheck source=/dev/null
source "$ZEPHYR_DIR/.venv/bin/activate"
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
    log "Downloading Zephyr SDK v${SDK_VERSION} (${SDK_ARCH})..."
    wget -q --show-progress "$SDK_URL" -O "/tmp/$SDK_INSTALLER"
    log "Extracting SDK..."
    tar -xf "/tmp/$SDK_INSTALLER" -C "$HOME"
    rm "/tmp/$SDK_INSTALLER"

    log "Running SDK setup (toolchain: $SDK_TOOLCHAIN)..."
    cd "$SDK_DIR"
    ./setup.sh -t "$SDK_TOOLCHAIN" -h -c
    ok "Zephyr SDK installed at $SDK_DIR."
else
    ok "Zephyr SDK already installed at $SDK_DIR."
fi

# --- Persist venv activation in .bashrc ---
VENV_LINE="source $ZEPHYR_DIR/.venv/bin/activate"
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
echo "To activate in a new shell:"
echo "  source $ZEPHYR_DIR/.venv/bin/activate"
echo ""
echo "To build the hello_world sample:"
echo "  cd $ZEPHYR_DIR/zephyr"
echo "  west build -b <your_board> samples/hello_world"
echo ""
