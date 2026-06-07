# Zephyr RTOS Setup Guide

Zephyr is a scalable real-time operating system designed for resource-constrained embedded devices. It supports a wide range of ARM Cortex-M targets — including STM32 and Nordic nRF series — which are commonly used in avionics hardware.

These scripts automate the full installation of the Zephyr SDK, the `west` meta-tool, and all required dependencies.

Note: 
- Summary written by AI
- Any time `zephyrproject` is mentioned, it can be replaced with the top level directory of your project.

---

## Quick Start

| Platform | Script |
|----------|--------|
| Linux (Ubuntu, Fedora, Arch) | `install_zephyr_linux.sh` |
| macOS (Intel and Apple Silicon) | `install_zephyr_mac.sh` |
| Windows (Git Bash + Chocolatey) | `install_zephyr_windows.sh` |

---

## Platform-Specific Instructions

### Linux

**Prerequisites:** `sudo` access is required to install system packages.

```bash
chmod +x install_zephyr_linux.sh
./install_zephyr_linux.sh
```

Supported distributions: Ubuntu, Debian, Linux Mint, Pop!_OS, Fedora, Arch, Manjaro.

---

### macOS

**Prerequisites:** The script will install Homebrew automatically if it is not present. Accept the Xcode Command Line Tools prompt when asked.

```bash
chmod +x install_zephyr_mac.sh
./install_zephyr_mac.sh
```

Works on both Intel (`x86_64`) and Apple Silicon (`arm64`) Macs.

---

### Windows

Windows support is provided through **Git Bash** (included with [Git for Windows](https://git-scm.com/download/win)) and [Chocolatey](https://chocolatey.org/install).

**Step 1: Install Chocolatey** (run once from an Administrator PowerShell)
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

**Step 2: Run the script from Git Bash** (not PowerShell or cmd.exe)
```bash
chmod +x install_zephyr_windows.sh
./install_zephyr_windows.sh
```

> **WSL2 alternative:** If you have WSL2 installed, running `install_zephyr_linux.sh` inside a WSL2 Ubuntu shell is generally more reliable than the Git Bash approach. See [Microsoft's WSL2 guide](https://learn.microsoft.com/en-us/windows/wsl/install) for setup instructions.

---

## What the Scripts Do

Each script performs the following steps in order:

1. **Install system packages** — cmake, ninja, gperf, device tree compiler, Python 3, and other build tools via the platform's package manager.
2. **Create a Python virtual environment** at `~/zephyrproject/.venv` to isolate Zephyr's Python dependencies from the system.
3. **Install West** — Zephyr's meta-build tool, used to manage the workspace and build firmware.
4. **Initialize the Zephyr workspace** at `~/zephyrproject/` by cloning the Zephyr repository and all required modules.
5. **Install Zephyr Python requirements** from `zephyr/scripts/requirements.txt`.
6. **Download and install the Zephyr SDK** — the cross-compilation toolchain for your target architecture.
7. **Persist the venv activation** in your shell profile (`.bashrc`, `.zshrc`, or `.bash_profile`) so the environment is available in future terminal sessions.

---

## Configuration

All scripts respect the following environment variables, which you can set before running to override defaults:

| Variable | Default | Description |
|----------|---------|-------------|
| `ZEPHYR_SDK_VERSION` | `0.16.8` | Zephyr SDK version to install |
| `ZEPHYR_BASE` | `~/zephyrproject` | Where to initialize the Zephyr workspace |
| `ZEPHYR_TOOLCHAIN` | `arm-zephyr-eabi` | Which cross-compiler toolchain to install |

**Example — install a specific SDK version and all toolchains:**
```bash
ZEPHYR_SDK_VERSION=0.16.8 ZEPHYR_TOOLCHAIN=all ./install_zephyr_linux.sh
```

**Common toolchain values:**
- `arm-zephyr-eabi` — ARM Cortex-M/R (STM32, nRF, most avionics MCUs)
- `riscv64-zephyr-elf` — RISC-V targets
- `xtensa-espressif_esp32_zephyr-elf` — ESP32
- `all` — every supported toolchain (~7 GB download)

> For most avionics work targeting STM32 or Nordic nRF MCUs, the default `arm-zephyr-eabi` toolchain is sufficient.

---

## Verifying the Installation

After the script completes, open a new terminal and run:

```bash
source ~/zephyrproject/.venv/bin/activate   # Linux/macOS
# or
source ~/zephyrproject/.venv/Scripts/activate  # Windows Git Bash

west --version
cmake --version
```

You should see version output for both tools with no errors.

---

## Building Your First Project

The standard Zephyr workflow uses `west build` to compile firmware for a specific board target.

```bash
# Activate the Zephyr environment
source ~/zephyrproject/.venv/bin/activate

# Navigate into the Zephyr source tree
cd ~/zephyrproject/zephyr

# Build the hello_world sample for your board
west build -b <board_name> samples/hello_world

# Flash the firmware (requires a connected programmer)
west flash
```

**Common board targets:**

| Board | Zephyr target name |
|-------|--------------------|
| STM32 Nucleo-F401RE | `nucleo_f401re` |
| STM32 Nucleo-L476RG | `nucleo_l476rg` |

Run `west boards` to list all supported targets, or search at [docs.zephyrproject.org](https://docs.zephyrproject.org/latest/boards/index.html).

---

## Pinning a Specific Zephyr Version

To use a specific Zephyr release instead of the latest, pass `--mr` to `west init`:

```bash
west init --mr v3.7.0 ~/zephyrproject
```

Zephyr releases follow the pattern `v<major>.<minor>.<patch>`. Check [GitHub releases](https://github.com/zephyrproject-rtos/zephyr/releases) for available versions.

---

## Troubleshooting

**`west: command not found` after installation**
The virtual environment is not active. Run:
```bash
source ~/zephyrproject/.venv/bin/activate
```

**`west update` fails mid-way**
Network interruptions can leave the workspace in a partial state. Re-run `west update` — it is idempotent and will resume where it left off.

**SDK setup fails with permission errors (Linux)**
Ensure `~/zephyr-sdk-<version>/` is owned by your user, not root. Re-run the SDK setup step manually:
```bash
cd ~/zephyr-sdk-0.16.8
./setup.sh -t arm-zephyr-eabi -h -c
```

**Homebrew not on PATH after install (macOS Apple Silicon)**
Add this to your `~/.zshrc`:
```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**CMake can't find the Zephyr package**
Run `west zephyr-export` from inside the workspace directory:
```bash
cd ~/zephyrproject
west zephyr-export
```

**Windows: `7z` not found**
Install 7-Zip via Chocolatey from an Admin shell, then reopen Git Bash:
```powershell
choco install 7zip
```

---

## Further Reading

- [Zephyr Getting Started Guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html)
- [West Workspace Basics](https://docs.zephyrproject.org/latest/develop/west/basics.html)
- [Zephyr Board Support](https://docs.zephyrproject.org/latest/boards/index.html)
- [Zephyr SDK Releases](https://github.com/zephyrproject-rtos/sdk-ng/releases)
