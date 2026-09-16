<p align="center">
  <img src="public/assets/logo/easy-unlocker-mark.svg" alt="easy-unlocker" width="120">
</p>

<h1 align="center">easy-unlocker · 官网</h1>

<p align="center">
  <a href="https://github.com/cyancity/easy-unlocker">easy-unlocker</a> 的公开落地页：Vite + React + Tailwind CSS v4，构建成纯静态站点，部署在 Cloudflare Pages。
</p>

---

## 本地开发

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/
npm run preview  # 本地预览 dist/
```

要求 Node.js ≥ 20。

## 目录

| 路径 | 内容 |
|---|---|
| `src/content.js` | 全站文案与链接常量（终端回放行、Agent 列表、FAQ、安装命令） |
| `src/components/` | 各段落组件：导航、Hero（终端 + 手机联动）、Agent、设计哲学、安全架构、FAQ、CTA、页脚 |
| `src/hooks/` | 滚动进度、复制、视口揭示，以及 Hero 的状态机 |
| `public/install.sh` | `curl \| sh` 安装脚本，从 GitHub Releases 拉对应平台的 `easyGet` |
| `public/assets/logo/` | 品牌标志资源，见该目录的 `MANIFEST.md` |

## 部署

`main` 分支推送后由 GitHub Actions 构建并发布到 Cloudflare Pages，需要仓库 Secrets：

| Secret | 说明 |
|---|---|
| `CLOUDFLARE_API_TOKEN` | 权限：Account → Cloudflare Pages → Edit |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |

手动发布：

```bash
npm run build
npx wrangler pages deploy dist --project-name easy-unlocker-site
```

## 关于内容

这是一个公开站点仓库，只包含公开信息：不含任何 Broker 地址、配对令牌、密钥、服务器或账号信息。提交前请确保新增文案同样保持脱敏。

## License

Apache-2.0，见 [LICENSE](LICENSE)。
