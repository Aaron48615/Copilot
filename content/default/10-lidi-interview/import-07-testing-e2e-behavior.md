---
id: lidi-202609-import-07-testing-e2e-behavior
title: E2E 测试怎样写得接近真实用户？
aliases: [Playwright 测试, 端到端行为测试]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Playwright, E2E, 用户行为, 测试数据]
---

# E2E 测试怎样写得接近真实用户？

## 核心回答

我会按用户目标写场景，比如“登录后搜索商品并加入购物车”，通过可见文字、角色和表单标签定位，而不是依赖一堆 CSS 层级。测试数据要可重复，环境要能清理；网络异常、空态和权限拒绝也要有关键用例。每条 E2E 只验证一条完整行为链，失败时保存截图、视频或 trace，方便回放。

