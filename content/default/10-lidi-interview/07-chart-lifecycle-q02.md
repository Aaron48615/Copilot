---
id: lidi-202609-chart-lifecycle-q02
title: ResizeObserver 和 window.resize 有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图, 智服工单]
keywords: [ECharts, ResizeObserver, resize, dispose, React, Vue]
---

# ResizeObserver 和 window.resize 有什么区别？

## 核心回答

1. `window.resize` 只能感知浏览器窗口变化，不能直接感知某个容器因为布局变化而改变尺寸。
2. `ResizeObserver` 观察的是具体元素，所以侧边栏展开、父容器宽度变化时也能收到通知。
3. 如果只是简单的全屏图表，监听 `window.resize` 也能用；在后台布局复杂、容器尺寸经常变化的页面里，`ResizeObserver` 更合适。
4. 观察器也要在组件销毁时解除，否则页面离开后仍可能触发回调。

