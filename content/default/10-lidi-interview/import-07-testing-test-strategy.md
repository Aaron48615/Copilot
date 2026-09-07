---
id: lidi-202609-import-07-testing-test-strategy
title: 单元、组件、集成和 E2E 测试分别测什么？
aliases: [前端测试分层, 测试金字塔]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [单元测试, 组件测试, 集成测试, E2E]
---

# 单元、组件、集成和 E2E 测试分别测什么？

## 核心回答

单元测试验证一个纯函数或小模块的输入输出，反馈最快；组件测试验证用户能看到的渲染和交互；集成测试把请求、状态和多个组件连起来，验证边界是否接得上；E2E 从真实页面走关键业务流程。我的取舍是把规则复杂、失败分支多的逻辑放在前两层，把登录、下单、权限跳转这种跨页面行为留给少量 E2E，避免所有问题都靠慢而脆的端到端脚本发现。

