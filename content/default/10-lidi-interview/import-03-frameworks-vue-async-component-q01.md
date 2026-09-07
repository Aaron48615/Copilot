---
id: lidi-202609-import-03-frameworks-vue-async-component-q01
title: keep-alive 下 onUnmounted 会执行吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [异步组件, keep-alive, defineAsyncComponent, 缓存]
---

# keep-alive 下 onUnmounted 会执行吗？

## 核心回答

组件被缓存时通常不会真正卸载，而是触发 activated / deactivated。需要暂停轮询、地图监听或视频播放时，应该在 deactivated 处理；永久释放的资源仍在真正卸载时清理。

