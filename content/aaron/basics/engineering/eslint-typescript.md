---
id: aaron-basic-engineering-eslint-typescript
title: ESLint 能检查 TypeScript 类型错误吗
aliases: [ESLint 能替代 tsc 类型检查吗？, 类型信息 lint 和 TypeScript 检查有什么区别？]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [ESLint, TypeScript, tsc]
---

# ESLint 能检查 TypeScript 类型错误吗

## 核心回答

ESLint 本身不等于 TypeScript 类型检查器。`typescript-eslint` 的部分规则能利用类型信息做 lint，但项目通常仍应独立执行 `tsc --noEmit`。
