---
id: lidi-202609-city-dashboard-data-q02
title: 如果其中一个接口失败怎么办？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: [城市视图]
keywords: [React, Redux Toolkit, ECharts, Promise.all, 仪表盘, CSV]
---

# 如果其中一个接口失败怎么办？

## 核心回答

1. 先判断这个接口是不是页面的核心数据。如果核心数据失败，可以给出页面级错误和重试按钮。
2. 如果只是一个非核心卡片失败，其他卡片可以继续展示，这时更适合按模块单独维护加载和错误状态，或者使用 `Promise.allSettled`。
3. 错误提示要具体一点，比如“交通排行加载失败”，不要只显示“请求失败”，否则用户不知道是哪一块有问题。
4. 重试时只重试失败的模块，不一定要把所有接口重新请求一遍，这样能减少等待和服务端压力。

