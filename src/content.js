export const SSE_LINES = [
  { text: '$ claude --task "deploy production v2.4"', cls: 'text-white font-semibold' },
  { text: '➔ Scanning workspace dependencies...', cls: 'text-neutral-500' },
  { text: '➔ Reading internal/auth/service.go...', cls: 'text-neutral-500' },
  { text: '➔ Running test suite: 42 passed (180ms)', cls: 'text-neutral-400' },
  { text: '➔ Building docker container image...', cls: 'text-neutral-400' },
  { text: '🔐 Secret required: OPENAI_API_KEY', cls: 'text-amber-400 font-medium' },
  { text: '➔ Invoking easyGet to securely inject...', cls: 'text-neutral-400' },
  { text: '$ easyGet env OPENAI_API_KEY --for "prod deploy"', cls: 'text-approve font-semibold' },
  { text: '➔ Generated curve25519 ephemeral keypair', cls: 'text-neutral-300' },
  { text: '➔ Waiting for mobile biometric approval... ⏳', cls: 'text-amber-300 font-medium animate-pulse' },
]

// 放行后终端的 SSE 回放行：批准后按打字机效果逐字符流式吐出，全程约 1.5s
export const APPROVED_LINES = [
  { text: '✓ [easyGet] 手机端已放行，密文经由 Broker 安全回传', cls: 'text-approve' },
  { text: '✓ [easyGet] 本地私钥内存瞬时解密成功', cls: 'text-approve' },
  { text: '✓ [easyGet] OPENAI_API_KEY 已注入目标子进程 (PID 48921)', cls: 'text-approve' },
  { text: '----------------------------------------', cls: 'font-semibold text-white' },
  { text: '[deploy.py] 正在向生产集群部署镜像...', cls: 'text-neutral-200' },
  { text: '➔ 校验数字证书通过 · 3 个可用区容器节点就位', cls: 'text-neutral-300' },
  { text: '✓ 发布顺利完成！所有服务健康检查通过 (Exit 0)', cls: 'font-bold text-approve' },
]

// 拒绝后终端的回执行：同样走打字机流式输出，约 0.5s
export const DENIED_LINES = [
  { text: '✕ [easyGet] 手机端已拒绝本次申请 (Exit Code 1)', cls: 'text-red-400' },
  { text: 'Agent 操作被安全阻断，未泄露任何凭据。', cls: 'text-neutral-400' },
]

// 站点自身托管 public/install.sh：一行装好 easyGet，不指向任何私有基础设施。
export const SITE_URL = 'https://easy-unlocker.pages.dev'
export const INSTALL_CMD = `curl -fsSL ${SITE_URL}/install.sh | sh`
export const GH_CMD = 'gh release download --repo cyancity/easy-unlocker'
export const RELEASE_URL = 'https://github.com/cyancity/easy-unlocker/releases/latest'
export const REPO_URL = 'https://github.com/cyancity/easy-unlocker'
export const SETUP_URL = 'https://github.com/cyancity/easy-unlocker/blob/main/docs/AGENTS-SETUP.md'

const IconStar = 'M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z'
const IconCube = 'M12 2L3 7L12 12L21 7L12 2ZM3 17L12 22L21 17V9.5L12 14.5L3 9.5V17Z'
const IconWave = 'M4 18C4 18 8 6 15 6C18 6 20 8 20 11C20 16 12 20 4 18Z'
const IconMask = 'M12 3C7 3 4 8 4 14C4 18 7 21 12 21C17 21 20 18 20 14C20 8 17 3 12 3ZM7 10C9 10 11 11 11 13C11 15 9 16 7 16C5 16 5 10 7 10ZM17 10C19 10 19 16 17 16C15 16 13 15 13 13C13 11 15 10 17 10Z'
const IconCloud = 'M20.5 11.2C20.2 8.7 18.2 6.8 15.7 6.7C15.3 5.4 14.4 4.3 13.2 3.6C10.7 2.2 7.6 2.8 5.8 5C4.2 5.5 3 6.9 2.6 8.5C1.6 11 2.3 13.8 4.2 15.6C4.4 16.9 5.2 18.1 6.3 18.9C8.8 20.6 12 20.3 14.1 18.3C15.6 18.2 17 17.3 17.7 15.9C19.8 14.8 20.9 12.6 20.5 11.2Z'

export const AGENTS = [
  {
    name: 'Claude Code', sub: 'Anthropic CLI', tag: 'easyGet env', icon: IconStar,
    desc: '执行长周期代码重构与部署任务时，通过 easyGet 动态获取短期密钥，绝不写进历史对话上下文。',
  },
  {
    name: 'Cursor', sub: 'IDE Agent', tag: 'Terminal Exec', icon: IconCube,
    desc: '在编辑器终端内一键拉起安全环境，自动拦截敏感操作并在手机弹出生物凭据核对卡。',
  },
  {
    name: 'Windsurf', sub: 'Cascade Tool', tag: 'Subprocess', icon: IconWave,
    desc: '在 Cascade 多轮会话中按需注入凭据，命令执行完成后立即释放，不留任何磁盘死灰。',
  },
  {
    name: 'Hermes', sub: 'Autonomous Core', tag: 'Autonomous', icon: IconMask,
    desc: '全自动自主运转，遇到资金调拨、生产集群发布等核心边界时强制触发手机物理放行。',
  },
  {
    name: 'Codex', sub: 'OpenAI Stack', tag: 'CLI Subprocess', icon: IconCloud,
    desc: '原生支持基于命令行的代码执行代理，自动捕获 easyGet 退出码阻断非法未授权行为。',
  },
  {
    name: 'Shell & CI/CD', sub: 'Bash / Zsh', tag: 'POSIX Code', icon: null,
    desc: '符合严谨的 UNIX 哲学，无多余守护进程依赖，随调随用，支持直接写入环境或受限文件。',
  },
]

export const PILLARS = [
  {
    num: '01', title: '现场瞬时公私钥', accent: false,
    desc: '每次申请现场由操作系统安全熵生成临时公私钥。公钥随请求送至手机，私钥常驻电脑内存，用完即毁。',
  },
  {
    num: '02', title: '手机硬件安全芯片', accent: true,
    desc: '基于 Android KeyStore 与 BiometricPrompt，必须拇指指纹生物通过后方可拆封本地库，使用收到的一次性公钥进行密文封装。',
  },
  {
    num: '03', title: '内存直入与退出销毁', accent: false,
    desc: '密文返回电脑后在内存中解密，直接注入目标子进程环境。拒绝、超时或进程结束立即清理，磁盘不留死灰。',
  },
]

export const FAQS = [
  {
    q: '如果中继 Broker 被劫持，我的 API Key 安全吗？',
    a: '绝对安全。中继服务器仅能接触到手机端使用临时公钥密封后的高强度密文。解密私钥始终留存在你本机的独立内存中，中继即便被完整倾倒也无法还原明文。',
  },
  {
    q: '它与 Bitwarden 或 1Password 有何不同？',
    a: '传统密码管理器专为人眼读取与浏览器填充设计，一旦解锁就是全库开放。easy-unlocker 专为智能体设计，只在触发具体任务时调取单一对应条目，并以非交互方式注入受控进程。',
  },
  {
    q: '手机不在身边或超时未批准会怎样？',
    a: 'easyGet 设有明确的超时窗口（默认 30 秒）。超时未批或你在手机上点击拒绝，CLI 会立刻返回非零退出码阻断后续任务，不会产生空凭据污染。',
  },
  {
    q: '为什么不直接在电脑上弹个窗确认？',
    a: '弹窗和要密钥的进程在同一台机器上：能骗你批准的程序，同样能伪造那个弹窗，或替你把批准点掉。审批挪到手机，「确认」这一步就离开了被防御对象的控制面。而且 Agent 跑在服务器或 CI 上时根本没有本机屏幕可弹，手机是唯一还能落到人手里的关卡。',
  },
  {
    q: '需要先买 1Password 或 Bitwarden 吗？',
    a: '不需要。保险库就在手机 App 里，不依赖任何付费密码管理器。已有的 Bitwarden 备份可以直接导入，之后由手机独立保管、逐条审批。',
  },
  {
    q: '为什么要自己跑一台中转服务器？',
    a: '审批发生在另一台设备上，手机和电脑之间总要有一条路。Broker 只做密文转发：条目值、CA 私钥全程端到端密封，它看不见明文。一条 wrangler deploy 起一个 Cloudflare Worker，或把 Go 二进制扔到 VPS 上即可。',
  },
]
