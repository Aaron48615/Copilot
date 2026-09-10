---
id: yingke-followup-all-settled-choice
title: 追问：【高频】为什么使用 `Promise.allSettled`，不用 `Promise.all`？
aliases: [能讲讲项目中的首页 allSettled 与 all 的选择吗？, 关于首页 allSettled 与 all 的选择，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, Promise.allSettled, Promise.all, 失败处理]
---

# 追问：【高频】为什么使用 `Promise.allSettled`，不用 `Promise.all`？

## 核心回答

首页三个分类互相不依赖，可以一起请求。allSettled 会等全部结束，保留每项成功或失败的结果；Promise.all 则是一项失败就整体 reject。

不过现在后面还没判断 status，失败分类怎么提示、怎么不影响其他分类还没做完，不能只看用了 allSettled 就说已经处理好了。

## 回答要点

- 首页三个分类互相不依赖，可以一起请求。allSettled 会等全部结束，保留每项成功或失败的结果；Promise.all 则是一项失败就整体 reject。
- 不过现在后面还没判断 status，失败分类怎么提示、怎么不影响其他分类还没做完，不能只看用了 allSettled 就说已经处理好了。

## 面试官可能追问

- 结果数组里的 status 为什么必须检查？
- 如果要求哪个分类先返回先显示，应怎样组织状态？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 36～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：同时创建三个请求，并使用 `Promise.allSettled` 保存结果。
