# 📝 Changelog / 更新记录

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
