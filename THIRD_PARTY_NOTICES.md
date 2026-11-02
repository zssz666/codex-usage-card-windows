# 🙏 第三方来源 / Third-party notices

## Original project / 原项目

- Repository: https://github.com/Lorie7813/codex-usage-card
- Release: v0.9.4-beta.1
- Runtime archive: `CodexUsageCard-macOS-0.9.4.zip`
- Published SHA256: `e41cbb00fd01b785eb0cac73a946115a35dd2d9a2410c196ec7287ce4b1737f8`
- Copyright: `Copyright (c) 2026 Codex Usage Badge contributors`
- License: MIT; the original notice is preserved in [LICENSE](LICENSE).

## Windows contribution / Windows 移植

- Contributor: SimonTan95
- PR: https://github.com/Lorie7813/codex-usage-card/pull/1
- Baseline commit: `1c5359dc648a99525bb6c169f7149e51d3ce9712`
- Source: https://github.com/SimonTan95/codex-usage-card/tree/1c5359dc648a99525bb6c169f7149e51d3ce9712/windows

The Windows agent, manager, reset-credit reader, optional sign-in entry, command launchers, and original six tests derive from that contribution. The agent includes the original generated ring UI and usage protocol implementation.

本仓库保留 Windows 贡献中的代理、管理器、重置卡读取、可选登录入口、命令启动文件与原有六项测试。代理内包含上游生成的圆环界面与额度协议实现。

## Local changes / 本地变更

- Launch the Store app through its registered application execution alias instead of directly creating the package EXE.
- Inspect the alias entry with `lstat`, preserving special reparse-point behavior.
- Wait for process creation and preserve launch failures with their original cause.
- Add six launch regression tests and Chinese/English documentation.
- Add original SVG explanatory artwork and a screenshot supplied by the user of this repository.

本地修复未改变上游圆环 UI、额度协议或重置卡补充查询逻辑。没有将原作者对旧客户端的测试声明当作本仓库全功能验收。

The local fix does not change the upstream ring UI, usage protocol, or supplemental reset-credit logic. Upstream testing claims for older client versions are not presented as full acceptance testing of this repository.

No affiliation with OpenAI is implied by the project name or compatibility description.
