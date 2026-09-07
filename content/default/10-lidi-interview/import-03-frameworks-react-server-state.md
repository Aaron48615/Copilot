---
id: lidi-202609-import-03-frameworks-react-server-state
title: React 里的服务端数据和 UI 状态怎么分？
aliases: [服务端状态, React 数据请求, server state]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [server state, cache, React, 请求, UI state]
---

# React 里的服务端数据和 UI 状态怎么分？

## 核心回答

服务端状态有缓存、过期、重试、失效和多个页面共享这些特点，不适合简单当成一个组件 state；弹窗开关、当前 tab、输入草稿才是典型 UI 状态。没有专门数据层时，也要把请求状态、请求参数和取消清理放在自定义 hook 里，避免每个页面各写一套。更新后要明确是重新拉取、局部更新还是让缓存失效，不能只改当前页面看起来对了。

