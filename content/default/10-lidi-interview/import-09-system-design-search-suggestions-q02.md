---
id: lidi-202609-import-09-system-design-search-suggestions-q02
title: 怎么验证体验和正确性？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [搜索联想, 防抖, 缓存, 竞态]
---

# 怎么验证体验和正确性？

## 核心回答

测试连续输入、快速删除、慢响应、取消、键盘导航、空结果和接口 500。性能上观察请求数、输入到结果的延迟和长列表渲染；可访问性上用键盘和读屏检查焦点、活动选项和 aria 状态是否同步。

