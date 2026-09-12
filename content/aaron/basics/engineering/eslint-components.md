---
id: aaron-basic-engineering-eslint-components
title: Parser、Plugin 和 Config 有什么区别
aliases: [ESLint 的解析器和插件及配置分别做什么？, ESLint 的 Parser 与 Plugin 如何分工？]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [Parser, Plugin, Config, ESLint]
---

# Parser、Plugin 和 Config 有什么区别

## 核心回答

| 概念 | 作用 | 例子 |
| --- | --- | --- |
| Parser | 把特定语法解析为 AST | TypeScript parser |
| Plugin | 提供额外规则、配置或处理器 | React Hooks、Vue 插件 |
| Config | 选择并配置一组规则 | `recommended` 配置 |

一个插件可以同时导出规则和推荐配置，所以实际项目中常会一起出现。TypeScript 项目一般使用 `typescript-eslint`；Vue 使用对应 Vue 插件处理 `.vue` 文件。
