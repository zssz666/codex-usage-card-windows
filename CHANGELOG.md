# 📝 Changelog / 更新记录

## 2026-11-19 — Sidebar recovery / 侧栏恢复

- Keep the usage monitor running and log temporary connection failures while Codex replaces its window.
- 客户端更换窗口时，额度插件继续运行并记录短暂断连，窗口恢复后重新显示圆环。

## 2026-11-09 — Notification duplicate launch / 通知重复启动

- Preserve the official package executable in `argv[0]` while launching through the Store execution alias, sharing the native profile and single-instance lock with notification launches.
- 修复别名启动与官方通知使用不同配置目录、允许重复实例的问题。保留旧目录，不自动迁移或覆盖数据。

## 2026-11-04 — Native usage ring / 官方额度圆环

- Hide the native sidebar Usage button while the plugin is active; remove the rule with the plugin's own stylesheet on stop.
- 插件运行时隐藏侧栏官方“用量”按钮；停止插件时随插件样式一起移除隐藏规则。

## 2026-11-02 — Windows community preview

### 🪟 修复 / Fixes

- Use the registered Store app execution alias to address direct package EXE launch failures (`spawn EPERM` / Windows error 5).
- Use `lstat` to inspect the alias without following its inaccessible special target.
- Surface launch failure causes and wait for successful process creation.

### 📚 文档 / Documentation

- Chinese and English READMEs with a real Windows ring screenshot, banner, and architecture illustration.
- Explicit provenance, MIT attribution, privacy disclosures, and compatibility limitations.
- Start / Status / Stop command entry points included in the portable folder.

### ✅ 验证 / Validation

- Twelve offline tests passed.
- Discovery checked on Store Codex `26.1027.3384.0`, Node.js `24.11.1`.
- User screenshot confirms two visible rings with live readings (64% and 28% at capture time).
- Hover behavior, reboot/sign-in startup, account switching, concurrent launches, long-term reconnect, other versions and display scales are not fully verified.
