---
id: lidi-202609-import-03-frameworks-vue-vue-common-directives
title: Vue 有哪些常用指令？
aliases: [常用指令, v-html, v-once, v-pre, v-cloak]
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [v-html, v-once, v-pre, v-cloak, v-bind, v-on]
---

# Vue 有哪些常用指令？

## 核心回答

天天用的：v-bind 动态绑属性（缩写 :），v-on 绑事件（缩写 @），v-if / v-else 条件渲染，v-for 列表循环，v-model 表单双向绑定。这几个说清楚就行。

低频但爱问的几个：v-html 输出真正的 HTML，有 XSS 风险，只能喂可信内容，用户输入绝不能直接 v-html；v-once 节点只渲染一次，之后数据再变它不更新；v-pre 跳过编译，花括号原样输出，省一点编译开销；v-cloak 是 Vue2 时代的，配合 CSS 把未编译的挂载区先藏起来，防止网慢时用户看到一闪而过的模板原文。

没用过的指令我不会硬背完整清单，会先讲常用的，再补一两个自己理解过的边界。比如说到 v-html，我会顺手说明 XSS 风险和清洗要求，让回答和实际写代码的考虑连起来。

