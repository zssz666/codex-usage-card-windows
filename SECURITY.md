# 🔐 安全与隐私 / Security & privacy

## 简体中文

这是非官方、实验性的 Windows 社区移植。当前客户端版本的一次成功显示不代表全部功能、设备或后续版本均已验证。

### 本机调试端口

界面注入使用 `127.0.0.1:39222` 的 Chrome DevTools Protocol（CDP）。这个接口可在客户端窗口中执行 JavaScript，权限超过额度读取。本机地址限制不提供身份认证或本地进程隔离。不要转发、代理或向网络开放端口。停止代理不会立即关闭客户端的调试端口；完全退出客户端后，通过原图标正常打开可结束本次调试启动。

### 数据访问与认证

额度通过本地 Codex CLI app-server 获取。当前代理不扫描项目，不请求聊天内容，不读取对话数据库。CLI 可能自行发出已认证网络请求。

继承自 Windows PR 的重置卡补充查询：CLI 未返回该字段时，`reset-credits.cjs` 会读取 `CODEX_HOME/auth.json`（默认 `~/.codex/auth.json`）中的现有登录信息，并向固定的 `https://chatgpt.com/backend-api/wham/rate-limit-reset-credits` 发起带认证的只读 GET。这个端点未公开；代码拒绝重定向，不记录凭据，失败显示“暂不可用”。当前没有单独开关。采用本项目也意味着采用这一已公开说明的数据路径；它不同于原 macOS 版仅通过 app-server 取数的路径。

上述说明不涵盖 Codex 客户端本身，也不构成恶意软件分析或独立安全审计保证。

### 本地文件与移除

运行时可能在项目目录产生 `windows.log`、`autostart.log`、`status.json`、`stop.flag`。日志和状态可能暴露本机路径及账号额度信息，公开前需脱敏。仓库忽略这些运行文件；不要把 `auth.json`、环境文件或凭据添加到提交中。

启动器不修改应用包、登录文件或安全设置，不自带自动更新，也不会在首次运行时自动注册登录启动。`Stop.cmd` 停止本项目监控并移除圆环，不关闭 Codex；若曾手动配置登录任务或快捷方式，应在删除目录前移除对应项。

### 问题报告

公开 Issue 请只提供已脱敏的错误、版本和复现步骤；不要附上凭据、完整账号响应、聊天内容、未经检查的日志或截图。涉及安全敏感细节时，优先使用仓库提供的私密报告渠道；如未提供，只公开不含敏感数据的概述。

## English

This is an unofficial, experimental Windows community port. One successful display on the current client does not validate every feature, device, or future version.

### Local debugging port

UI injection uses Chrome DevTools Protocol at `127.0.0.1:39222`. CDP can evaluate JavaScript in client windows and provides access beyond usage reading. Loopback validation does not authenticate clients or isolate local processes. Never forward, proxy, or expose the port. Stopping the agent does not immediately close the debug endpoint; fully quit Codex and reopen normally through the original icon to end that debug launch.

### Data and authentication

Usage is read through the local Codex CLI app-server. The agent does not scan projects, request chats, or read the conversation database. The CLI may make its own authenticated network requests.

The inherited Windows reset-credit supplement reads existing login information from `CODEX_HOME/auth.json` (default `~/.codex/auth.json`) when the CLI omits reset-credit fields. It makes an authenticated read-only GET to the fixed endpoint `https://chatgpt.com/backend-api/wham/rate-limit-reset-credits`. This endpoint is undocumented. Redirects are rejected, credentials are not logged, and failures appear unavailable. There is currently no separate switch. Using this project includes this disclosed data path, which differs from the macOS app-server-only path.

These statements do not cover Codex itself and are not malware analysis or an independent security-audit guarantee.

### Local files and removal

Runtime files may include `windows.log`, `autostart.log`, `status.json`, and `stop.flag`. They can reveal local paths and usage metadata. Redact before sharing. These files are ignored by the repository; never commit authentication files, environment files, or credentials.

The launcher does not modify application packages, login files, or security settings. There is no automatic updater or automatically registered sign-in task. `Stop.cmd` stops this monitor and removes the rings while keeping Codex open. Remove any manually configured sign-in task or shortcut before deleting the folder.

### Reporting

Public issues should contain only redacted errors, versions, and reproduction steps. Do not post credentials, complete account responses, chats, unchecked logs, or screenshots. Use a private reporting channel when available; otherwise post only a non-sensitive summary.
