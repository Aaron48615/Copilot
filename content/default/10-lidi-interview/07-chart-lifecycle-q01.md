---
id: lidi-202609-chart-lifecycle-q01
title: 为什么不能每次数据变化都重新初始化图表？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图, 智服工单]
keywords: [ECharts, ResizeObserver, resize, dispose, React, Vue]
---

# 为什么不能每次数据变化都重新初始化图表？

## 核心回答

1. 重新初始化会重复创建实例，旧实例如果没有销毁就会占用内存，还可能重复绑定事件。
2. 图表配置更新通常只需要调用 `setOption`，这样可以保留实例和交互状态，开销也更小。
3. 只有在容器或图表类型发生特殊变化、无法通过配置更新时，才考虑销毁后重新创建。
4. 关键是让初始化、更新和销毁三个阶段分开，不要把它们都写在一个没有边界的副作用里。

