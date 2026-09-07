---
id: lidi-202609-import-06-ai-agent-ai-code-ownership-q03
title: 怎么区分 AI 写的功能已经做好还是只是看起来能用？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [代码审查, 理解, 边界条件, 结对, 质量闸门]
---

# 怎么区分 AI 写的功能已经做好还是只是看起来能用？

## 核心回答

我会找输入和预期输出能对上的场景。比如推荐系统用固定商品和固定需求跑规则测试，再单独验证模型解析。两部分分开看，出了问题才知道是理解错了，还是筛选逻辑错了。没有验证到的部分，就不能直接说已经保证了。

