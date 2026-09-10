---
id: yingke-followup-navigation-delay
title: 追问：点击“更多”为什么先等待 500 毫秒再跳转？
aliases: [能讲讲项目中的更多按钮的固定 500ms 延迟吗？, 关于更多按钮的固定 500ms 延迟，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [追问, 导航, loading, 固定延迟]
---

# 追问：点击“更多”为什么先等待 500 毫秒再跳转？

## 核心回答

这 500ms 没有在等接口或导航准备，只是显示 loading 后固定等一会儿，用户会多等一下。我会直接跳列表，由列表根据实际请求显示骨架屏；想防重复点击就加点击锁或节流。

【当时为什么加延迟，光看代码不能确定，现在能确认的是它增加了固定等待。】

## 回答要点

- 这 500ms 没有在等接口或导航准备，只是显示 loading 后固定等一会儿，用户会多等一下。
- 当时为什么加延迟，光看代码不能确定，现在能确认的是它增加了固定等待。

## 面试官可能追问

- 固定延迟能否保证列表数据已准备完成？
- 防重复点击为什么应与数据等待分开处理？

## 代码证据

> **代码依据（不用于口述）**
>
> - [components/listContent.vue 第 28～38 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:28>)：先显示 loading，固定延迟 500 毫秒后导航并关闭。
