---
id: lidi-202609-search-cleanup
title: 为什么搜索页卸载时还要清理定时器和请求？
aliases: [onBeforeUnmount, 搜索请求清理, 组件卸载]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [onBeforeUnmount, AbortController, clearTimeout, 生命周期]
---

# 为什么搜索页卸载时还要清理定时器和请求？

## 核心回答

1. 搜索联想有一个 300 毫秒定时器，也可能有已经发出的 fetch 请求。如果用户离开搜索页，这些异步任务没有必要继续工作。
2. `onBeforeUnmount` 里调用 `stopSuggestionRequest`，它会清理定时器、abort 当前请求、清空 controller，并递增请求编号。
3. 递增编号很重要。即使某个请求已经无法真正取消，返回时也会发现它的编号过期，从而不再更新建议。
4. 这可以减少无效请求，也避免组件已经离开以后，旧结果影响下一次打开搜索页的状态。
5. 这是 Vue 组件生命周期和 JavaScript 异步控制结合使用的例子：创建了定时器和请求，就要在生命周期结束时清理它们。

