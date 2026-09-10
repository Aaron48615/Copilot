---
id: yingke-followup-comment-xss
title: 追问：评论文本会不会产生 XSS？
aliases: [能讲讲项目中的评论文本的 XSS 边界吗？, 关于评论文本的 XSS 边界，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 模板插值, v-html, 文本转义]
---

# 追问：评论文本会不会产生 XSS？

## 核心回答

现在评论用 Vue 模板插值，按普通文本显示，没有用 v-html 插入第三方 HTML，所以这方面的风险比较小，也没有单独做富文本清洗。

【以后改成富文本，就要先过滤内容，只允许可信标签和属性，不能直接插入接口字符串。】

## 回答要点

- 现在评论用 Vue 模板插值，按普通文本显示，没有用 v-html 插入第三方 HTML，所以这方面的风险比较小，也没有单独做富文本清洗。
- 以后改成富文本，就要先过滤内容，只允许可信标签和属性，不能直接插入接口字符串。

## 面试官可能追问

- 如果以后允许评论富文本，需要增加哪些限制？
- 普通文本安全能否证明整个应用没有 XSS 风险？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 20～22 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:20>)：列表把评论字符串作为 props 传入组件。
> - [components/descComment.vue 第 1～5 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:1>)：评论通过双大括号插值显示，没有使用 `v-html`。
