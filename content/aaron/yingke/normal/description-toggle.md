---
id: yingke-normal-description-toggle
title: 简介展开和收起
aliases: [能讲讲项目中的简介展开和收起吗？, 关于简介展开和收起，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [descComment, 文本截断, 事件冒泡]
---

# 简介展开和收起

## 核心回答

评论长短不一，全部展示会让一条列表占太多空间，所以我封装了 descComment。传入完整评论后，超过 50 个字符就先显示前 50 个，点展开看全文，点收起再截断。

列表外层可以跳详情，所以简介区域还阻止了点击冒泡，避免只想展开文字却跳走。

【现在短评论也会显示展开，而且只在创建时计算了一次，后面 val 变化不会重新算。这两个情况还需要补。】

## 回答要点

- 评论长短不一，全部展示会让一条列表占太多空间，所以我封装了 descComment。
- 列表外层可以跳详情，所以简介区域还阻止了点击冒泡，避免只想展开文字却跳走。
- 现在短评论也会显示展开，而且只在创建时计算了一次，后面 val 变化不会重新算。

## 面试官可能追问

- 父组件后来换了简介，显示文本会不会更新？
- 短于 50 个字符时是否还需要展开按钮？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 20～22 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:20>)：在列表中接入简介组件并阻止点击冒泡。
> - [components/descComment.vue 第 1～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:1>)：展开和收起的显示入口。
> - [components/descComment.vue 第 9～40 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:9>)：props、50 字截断、展开、收起及创建时初始化。
