#!/bin/sh
# easy-unlocker · easyGet 安装脚本
#   curl -fsSL https://easy-unlocker.pages.dev/install.sh | sh
# 只做一件事：把最新 Release 里对应平台的 easyGet 装到 ~/.local/bin。
# 配对（Broker 地址与配对码）请在安装后执行 `easyGet pair`。

set -eu

repo=${EASYGET_REPO:-"cyancity/easy-unlocker"}
install_dir=${EASYGET_INSTALL_DIR:-"$HOME/.local/bin"}

os=$(uname -s | tr 'A-Z' 'a-z')
arch=$(uname -m | sed 's/x86_64/amd64/; s/aarch64/arm64/')

case "$os" in
darwin | linux) ;;
*)
	echo "不支持的系统：$os（请从 https://github.com/$repo/releases 手动下载）" >&2
	exit 1
	;;
esac

asset="easyGet-${os}-${arch}"
url="https://github.com/$repo/releases/latest/download/$asset"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT HUP INT TERM

echo "下载 $asset ..."
if ! curl --fail --silent --show-error --location "$url" --output "$tmp/easyGet"; then
	echo "下载失败：$url" >&2
	exit 1
fi

mkdir -p "$install_dir"
install -m 755 "$tmp/easyGet" "$install_dir/easyGet"

echo "easyGet 已安装到 $install_dir/easyGet"
case ":$PATH:" in
*":$install_dir:"*) ;;
*) echo "提示：$install_dir 不在 PATH 中，请先加入 PATH" >&2 ;;
esac
echo "下一步：easyGet pair --broker <你的 Broker 地址>"
