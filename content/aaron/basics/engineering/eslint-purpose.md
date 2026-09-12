---
id: aaron-basic-engineering-eslint-purpose
title: ESLint 是什么，它怎样检查代码？
aliases: [ESLint 如何通过 AST 发现代码问题？, ESLint 的职责和工作原理是什么？]
category: engineering
difficulty: 基础
priority: high
projects: []
keywords: [ESLint, AST, 静态检查]
---

# ESLint 是什么，它怎样检查代码？

## 核心回答

ESLint 是一个可配置、可扩展的 JavaScript 静态检查工具。它在不运行业务代码的情况下，将源码解析为 AST，再用一组规则遍历 AST，发现潜在错误、可维护性问题和不符合团队约定的写法。部分问题可以通过 `--fix` 自动修复。

它主要解决五类问题：

1. 代码质量检查，如未使用变量、恒真条件。
2. 统一团队编码约定。
3. 借助插件检查 TypeScript、Vue、React 等生态代码。
4. 通过自定义规则固化项目约束。
5. 集成编辑器、Git hooks 和 CI，在代码合并前拦住问题。

### ESLint 的工作原理

```text
源代码
  ↓ Parser（默认 Espree）
AST 抽象语法树
  ↓ 遍历节点，触发规则的 visitor
context.report() 报告问题
  ↓
格式化输出 / fixer 生成修复
```

- **Parser**：把文本转成 ESLint 能理解的 AST。
- **Rule**：针对 AST 节点实现检查逻辑。
- **Plugin**：打包额外的 rules、configs、processors 或语言能力。
- **Shareable config**：可复用的一组配置。
- **Processor**：先从 Vue、Markdown 等文件中提取可检查代码，检查后再映射回原文件位置。

> [!important]
> ESLint 不是编译器，也不能证明业务逻辑正确。它是基于语法结构和规则做静态分析，仍需要类型检查、测试和 Code Review 配合。
