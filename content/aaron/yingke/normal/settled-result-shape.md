---
id: yingke-normal-settled-result-shape
title: 难点一：并发请求成功和失败时的数据结构不同
aliases: [能讲讲项目中的并发请求成功与失败的结果结构吗？, 关于并发请求成功与失败的结果结构，能结合当前项目解释一下吗？]
category: yingke
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [难点, Promise.allSettled, value, reason]
---

# 难点一：并发请求成功和失败时的数据结构不同

## 核心回答

这里的问题是，allSettled 成功项里有 value，失败项里是 reason。现在组件没有先判断状态，直接读 `main.value.subject_collection`，失败时就可能访问到 undefined。

所以还需要按分类处理成功、失败和重试，不能只把 Promise.all 换成 allSettled 就结束。换回 Promise.all 也不合适，一项失败又会进入整体失败分支。

【可以让一个分类失败、另外两个成功，检查成功部分能不能显示、失败部分会不会引起报错。这次还没有实际运行这个验证。】

## 回答要点

- 这里的问题是，allSettled 成功项里有 value，失败项里是 reason。
- 所以还需要按分类处理成功、失败和重试，不能只把 Promise.all 换成 allSettled 就结束。
- 可以让一个分类失败、另外两个成功，检查成功部分能不能显示、失败部分会不会引起报错。

## 面试官可能追问

- 为什么只换成 allSettled 仍不能完成容错？
- 单分类失败的重试状态应该由哪一层保存？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 36～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：使用 `Promise.allSettled` 并保存三种 settlement 结果。
> - [components/listContent.vue 第 4～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:4>)：组件直接从 `main.value` 读取分类数据，没有失败分支。
