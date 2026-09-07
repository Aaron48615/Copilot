---
id: lidi-202609-import-07-testing-e2e-behavior-q02
title: E2E 如何处理第三方服务？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Playwright, E2E, 用户行为, 测试数据]
---

# E2E 如何处理第三方服务？

## 核心回答

支付、地图、模型服务这类第三方依赖应在大多数测试中通过稳定的 API mock 或测试环境替代，另设少量合约或冒烟测试验证真实接入。mock 的响应要覆盖成功、超时、部分字段缺失和限流，避免测试只证明“假服务永远成功”。

