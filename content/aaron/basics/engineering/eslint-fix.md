---
id: aaron-basic-engineering-eslint-fix
title: `--fix` 会不会改坏代码
aliases: [ESLint 自动修复后需要验证什么？, 大范围使用 lint 自动修复有什么注意事项？]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [ESLint, 自动修复, Git diff]
---

# `--fix` 会不会改坏代码

## 核心回答

规则的 fixer 应仅执行安全、确定的修复，但升级规则或大规模自动修复仍应通过 Git diff、类型检查和测试验证。
