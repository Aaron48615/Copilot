---
id: lidi-202609-import-08-coding-array-object-utils-q02
title: 分页和后端分页有什么不同？
aliases: []
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [flatten, groupBy, 去重, 分页]
---

# 分页和后端分页有什么不同？

## 核心回答

前端分页适合数据量已经完整加载、需要本地切页的场景；数据量大、实时性高或权限敏感时应让后端分页和过滤。后端分页要处理 total 变化、游标或 offset、重复数据和请求竞态，前端仍要保留 loading、空态和错误重试。

