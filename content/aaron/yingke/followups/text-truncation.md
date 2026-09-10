---
id: yingke-followup-text-truncation
title: 追问：【高频】标题和简介为什么用了不同的省略方式？简介一定要用 JavaScript 截断吗？
aliases: [能讲讲项目中的标题省略与简介展开方案吗？, 关于标题省略与简介展开方案，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, text-overflow, line-clamp, 文本截断]
---

# 追问：【高频】标题和简介为什么用了不同的省略方式？简介一定要用 JavaScript 截断吗？

## 核心回答

标题只需要一行省略，我就用 overflow、white-space 和 text-overflow 控制显示。简介还要展开、收起，现在是用状态切换截断后的文字和原文，写起来比较直接。

不过展开收起并不一定要用 JavaScript 截字符串，CSS 的 line-clamp 也能限制行数，保留原文，展开时切换样式就可以。这里主要是当前实现方式不同。

【现在 JS 截断还要完善：短评论也出现展开，props 变化后显示内容也没有重新计算，slice(0, 50) 按 UTF-16 单元截取，有些 emoji 可能截断。我会把是否超长和是否展开分开，再处理这些细节。】

## 回答要点

- 标题只需要一行省略，我就用 overflow、white-space 和 text-overflow 控制显示。
- 不过展开收起并不一定要用 JavaScript 截字符串，CSS 的 line-clamp 也能限制行数，保留原文，展开时切换样式就可以。
- 现在 JS 截断还要完善：短评论也出现展开，props 变化后显示内容也没有重新计算，slice(0, 50) 按 UTF-16 单元截取，有些 emoji 可能截断。

## 面试官可能追问

- slice 按 UTF-16 截断时 emoji 可能出现什么问题？
- 按行数省略和按字符数截断的展示效果有什么不同？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/descComment.vue 第 1～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:1>)：展开、收起入口。
> - [components/descComment.vue 第 18～35 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:18>)：使用 `slice` 截断并切换完整文本。
> - [components/listContent.vue 第 91～95 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:91>)：标题使用 CSS 单行省略。
