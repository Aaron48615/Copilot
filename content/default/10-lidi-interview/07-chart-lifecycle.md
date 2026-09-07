---
id: lidi-202609-chart-lifecycle
title: ECharts 和 ResizeObserver 在你的项目中是怎么配合的？
aliases: [ECharts 生命周期, 图表自适应, ResizeObserver, 图表销毁]
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图, 智服工单]
keywords: [ECharts, ResizeObserver, resize, dispose, React, Vue]
---

# ECharts 和 ResizeObserver 在你的项目中是怎么配合的？

## 核心回答

1. 图表初始化需要一个真实存在并且有尺寸的 DOM 容器，所以我会在 React 的 `useEffect` 或 Vue 的挂载阶段拿到容器后创建 ECharts 实例。
2. 接口数据回来以后，我把数据转换成 ECharts 需要的 `option`，通过 `setOption` 更新图表，而不是每次数据变化都重新创建一个实例。
3. 容器尺寸变化时，调用图表实例的 `resize`。我使用 `ResizeObserver` 观察图表容器，解决侧边栏展开、窗口变化或父容器尺寸变化后图表没有跟着调整的问题。
4. 组件卸载时要移除观察器、解绑事件并调用 `dispose` 释放图表实例，否则可能出现内存泄漏、重复绑定或页面返回后出现多个图表实例。
5. 更新数据时还要注意实例是否已经被销毁，避免异步请求返回后对一个已经不存在的图表调用方法。

