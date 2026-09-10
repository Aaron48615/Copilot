---
id: shiguang-followup-debounce-delay
title: 追问：搜索为什么使用防抖，不用节流？500ms 是怎么定的？
aliases: [能讲讲项目中的搜索防抖与 500ms 延迟的取舍吗？, 关于搜索防抖与 500ms 延迟的取舍，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, 防抖, 节流, 等待时间]
---

# 追问：搜索为什么使用防抖，不用节流？500ms 是怎么定的？

## 核心回答

AI 联想更关心用户停下来后输入的完整关键词，所以用了防抖。每次输入都重新计时，停够 500ms 再请求。节流会在持续操作时隔一段时间执行，可能还在请求没输完的词，更适合滚动、拖动这类持续反馈。

500ms 是目前在请求次数和等待时间之间选的值，没有实验能证明它最好。

【最终看到结果还要加网络、服务端和模型耗时。页面还让 loading 至少显示 400ms，避免闪一下就消失，模型很快时也会多等一点。要调这些值，我会一起看请求次数和停止输入到看到结果的时间。】

## 回答要点

- AI 联想更关心用户停下来后输入的完整关键词，所以用了防抖。
- 500ms 是目前在请求次数和等待时间之间选的值，没有实验能证明它最好。
- 最终看到结果还要加网络、服务端和模型耗时。页面还让 loading 至少显示 400ms，避免闪一下就消失，模型很快时也会多等一点。

## 面试官可能追问

- 调小防抖时间会怎样影响请求量和等待体验？
- loading 最少展示 400ms 会不会额外增加等待？

## 代码证据

> **代码依据（不用于口述）**
> - [搜索页第 350～395 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:350)：AI 联想和至少 400ms 的加载展示。
> - [搜索页第 397～410 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:397)：输入变化后触发防抖。
> - [搜索页第 458～467 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:458)：debounce 的计时器实现。
