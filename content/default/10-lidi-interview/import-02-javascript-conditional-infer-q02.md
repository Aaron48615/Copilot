---
id: lidi-202609-import-02-javascript-conditional-infer-q02
title: 类型体操能校验运行时数据吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, infer, 条件类型, 映射类型]
---

# 类型体操能校验运行时数据吗？

## 核心回答

不能。TypeScript 类型在编译后会被擦除，接口返回的 JSON 仍然可能缺字段或类型错误。边界处应先以 unknown 接收，再用 schema 或 type guard 做运行时校验，校验通过后才进入领域逻辑。
