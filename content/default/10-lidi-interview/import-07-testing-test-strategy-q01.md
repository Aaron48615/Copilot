---
id: lidi-202609-import-07-testing-test-strategy-q01
title: 为什么不直接写 E2E？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [单元测试, 组件测试, 集成测试, E2E]
---

# 为什么不直接写 E2E？

## 核心回答

E2E 很接近真实用户，但启动慢、定位失败原因难，还容易受网络和测试数据影响。如果所有断言都放在那里，改一个按钮文案就可能让整套测试失效。我会用稳定的测试数据和少量关键路径 E2E，再用单元与组件测试覆盖大多数分支。

