---
id: yingke-normal-loading-feedback
title: 页面等待反馈
aliases: [能讲讲项目中的页面加载等待反馈吗？, 关于页面加载等待反馈，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [Loading, Skeleton, Toast]
---

# 页面等待反馈

## 核心回答

首页等待时显示 Vant Loading，列表首屏用 Skeleton 骨架屏，触底时显示小程序 loading，没有更多数据就用 Toast 提示。主要是让用户知道正在加载，还是已经看完了。

【骨架屏能让等待时不那么空，但不会让接口变快。错误页和空列表还没有统一处理，触底 loading 也关得太早，没等请求真正结束。】

## 回答要点

- 首页等待时显示 Vant Loading，列表首屏用 Skeleton 骨架屏，触底时显示小程序 loading，没有更多数据就用 Toast 提示。
- 骨架屏能让等待时不那么空，但不会让接口变快。

## 面试官可能追问

- 骨架屏为什么不能证明接口变快？
- 触底 loading 应在什么时候结束？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 3～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:3>)：首页 Loading 与内容区切换。
> - [pages/list/index.vue 第 3～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:3>)：列表页骨架屏、Toast 容器和内容结构。
> - [pages/list/index.vue 第 64～73 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：数据返回后关闭骨架屏。
> - [pages/list/index.vue 第 88～101 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：触底 loading 和到底提示。
