---
id: lidi-202609-city-dashboard-data
title: 城市视图的仪表盘数据是怎么获取和展示的？
aliases: [城市视图仪表盘, Promise.all 数据, 多接口并行, CSV 导出]
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图]
keywords: [React, Redux Toolkit, ECharts, Promise.all, 仪表盘, CSV]
---

# 城市视图的仪表盘数据是怎么获取和展示的？

## 核心回答

1. 城市视图的仪表盘需要展示城市概览、事件统计、公共设施和交通排行等多个模块。进入页面后，我把这些相互独立的请求并行发出，而不是一个请求完成后再发下一个。
2. 这些请求使用 `Promise.all` 组合，全部成功以后把结果分发给对应的卡片、表格和 ECharts 图表。
3. 页面会区分加载中、成功、空数据和错误状态，不会在数据还没回来时直接把图表初始化成一堆错误内容。
4. CSV 导出时，我会根据当前页面展示的数据整理表头和行数据，再生成文件下载。导出的内容要和用户当前筛选条件一致，不能导出另一份旧数据。
5. 登录状态和用户相关信息使用 Redux Toolkit 管理，页面内部的图表配置和临时筛选则尽量留在局部状态中，避免所有数据都进入全局 Store。

