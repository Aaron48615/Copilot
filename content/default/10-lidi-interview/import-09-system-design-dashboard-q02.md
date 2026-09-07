---
id: lidi-202609-import-09-system-design-dashboard-q02
title: 刷新和缓存怎么取舍？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [dashboard, 图表, 聚合, 刷新]
---

# 刷新和缓存怎么取舍？

## 核心回答

需要新鲜数据的卡片用短轮询或推送，并在页面不可见时暂停；历史趋势可以按查询条件缓存。请求要带取消和请求版本，避免慢的旧刷新覆盖新结果。刷新失败保留上一次带时间戳的数据，同时给出过期提示，比整块清空更容易判断发生了什么。

