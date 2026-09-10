---
id: yingke-followup-loading-lifetime
title: 追问：【高频】为什么 loading 会立即消失？
aliases: [能讲讲项目中的分页 loading 立即消失的原因吗？, 关于分页 loading 立即消失的原因，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [追问, await, finally, loading]
---

# 追问：【高频】为什么 loading 会立即消失？

## 核心回答

因为 getList 是异步的，触底时没有 await，下一行就执行 hideLoading，数据还没回来提示就关了。

我会先等 getList 完成，再在 finally 里关闭 loading，这样成功和失败都能正确结束。

## 回答要点

- 因为 getList 是异步的，触底时没有 await，下一行就执行 hideLoading，数据还没回来提示就关了。
- 我会先等 getList 完成，再在 finally 里关闭 loading，这样成功和失败都能正确结束。

## 面试官可能追问

- getList 没返回 Promise 时 await 能否等待真正结束？
- 请求失败时为什么也必须关闭 loading？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/list/index.vue 第 88～95 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：调用异步 `getList` 后立即关闭 loading。
