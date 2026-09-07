---
id: lidi-202609-import-03-frameworks-react-forms-q02
title: 表单性能差时怎么查？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [React, 表单, controlled, uncontrolled, 校验]
---

# 表单性能差时怎么查？

## 核心回答

先用 Profiler 看是不是每次按键都让整张表重渲染，再按字段拆分订阅或使用非受控方案。不要一上来给所有输入套 memo；如果校验本身昂贵，可以防抖或放到 worker。最终仍要用真实字段数和低端设备测输入延迟。

