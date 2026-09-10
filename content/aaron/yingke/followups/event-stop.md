---
id: yingke-followup-event-stop
title: 追问：为什么简介区域要阻止事件冒泡？
aliases: [能讲讲项目中的简介区域阻止点击冒泡的原因吗？, 关于简介区域阻止点击冒泡的原因，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 事件冒泡, stop, 详情跳转]
---

# 追问：为什么简介区域要阻止事件冒泡？

## 核心回答

整条列表点击会进详情，简介里的展开、收起不应该跟着跳转，所以我给简介区域和按钮加了 .stop，阻止点击继续冒泡到外层。这样用户展开文字时就不会误进详情。

## 回答要点

- 整条列表点击会进详情，简介里的展开、收起不应该跟着跳转，所以我给简介区域和按钮加了 .stop，阻止点击继续冒泡到外层。
- 这样用户展开文字时就不会误进详情。

## 面试官可能追问

- 只给展开按钮加 stop 是否覆盖整个简介区域？
- 怎样验证点击文本不会误触发外层跳转？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 6～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:6>)：列表项整体绑定详情跳转。
> - [pages/list/index.vue 第 20～22 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:20>)：简介区域使用 `.stop` 阻止冒泡。
> - [components/descComment.vue 第 3～5 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:3>)：展开、收起按钮同样使用 `.stop`。
