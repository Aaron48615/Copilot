---
id: lidi-202609-import-02-javascript-interface-type
title: interface 和 type 在项目里怎么取舍？
aliases: [interface vs type, TypeScript 类型声明]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, interface, type, declaration merging]
---

# interface 和 type 在项目里怎么取舍？

## 核心回答

两者都能描述对象契约，团队最重要的是保持一致。interface 支持 extends 和声明合并，适合公开的对象形状或需要被库扩展的契约；type 更方便表达联合、交叉、元组和条件类型。它们都不是运行时校验，也不能因为换了写法就改变 API 行为。我会按项目约定选择，并避免让同一个领域类型在多个文件用两套名字表达。
