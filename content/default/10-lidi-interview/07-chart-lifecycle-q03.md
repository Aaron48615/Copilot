---
id: lidi-202609-chart-lifecycle-q03
title: ECharts 是什么？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图, 智服工单]
keywords: [ECharts, 数据可视化, init, setOption, Canvas, SVG]
---

# ECharts 是什么？

ECharts 就简单很多。

它是一个 JavaScript 数据可视化库，常见用途：

- 折线图
- 柱状图
- 饼图
- 散点图
- 地图
- 仪表盘
- 数据大屏

官方目前提供 20 多种开箱即用的图表类型，同时支持 Canvas 和 SVG 渲染。

最核心的使用方式，你记两个 API：

```const chart = echarts.init(dom)

chart.setOption(option)
```

然后主要就是写 option：

```const option = {
  xAxis: {
    data: ['Mon', 'Tue', 'Wed']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [10, 20, 15]
    }
  ]
}
```

官方入门文档本身也是 `echarts.init()` + `setOption()` 这个流程。

面试问：

ECharts 用过吗？

你可以答：

用过，主要是做数据可视化。一般先通过 echarts.init 初始化图表实例，然后通过 setOption 配置数据、坐标轴、series、tooltip 这些内容。项目里如果数据发生变化，可以重新更新 option 来更新图表。
