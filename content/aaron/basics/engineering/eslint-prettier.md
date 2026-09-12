---
id: aaron-basic-engineering-eslint-prettier
title: ESLint 和 Prettier 的区别
aliases: [代码检查和代码格式化有什么不同？, ESLint 与 Prettier 怎么搭配？]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [ESLint, Prettier, 代码质量]
---

# ESLint 和 Prettier 的区别

## 核心回答

| 对比 | ESLint | Prettier |
| --- | --- | --- |
| 主要职责 | 代码质量与规则检查 | 代码排版格式化 |
| 关心内容 | 未使用变量、不安全写法、框架规则等 | 缩进、换行、引号、行宽等 |
| 自动修复 | 只修复规则明确标记为可修复的问题 | 根据格式化算法重排代码 |

常见做法是让 ESLint 负责质量，Prettier 负责格式，并关闭两者冲突的格式规则。不要把所有排版偏好都写成 ESLint 规则。
