---
id: lidi-202609-import-06-ai-agent-ai-code-ownership-q01
title: 拿智能导购举例，你能讲清哪部分？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [代码审查, 理解, 边界条件, 结对, 质量闸门]
---

# 拿智能导购举例，你能讲清哪部分？

## 核心回答

比如模型只负责提取预算、品类和需求，商品由后端从库里选择。匹配函数会查商品参数、标签和描述，记录命中的依据。页面里显示哪些条件匹配了，就是从这个结果来的；不是让模型随便生成一段推荐理由。

