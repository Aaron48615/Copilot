---
id: aaron-basic-browser-browser-processes
title: 浏览器中有哪些进程和线程，一个标签页一定对应一个进程吗？
aliases: [Chromium 的进程和线程怎么分工？, 浏览器为什么不能简单按标签页数计算进程数？]
category: browser
difficulty: 进阶
priority: normal
projects: []
keywords: [浏览器架构, Renderer, 主线程, 进程隔离]
---

# 浏览器中有哪些进程和线程，一个标签页一定对应一个进程吗？

## 核心回答

### 浏览器中的进程和线程

Chromium 类浏览器通常使用多进程架构，常见角色包括：

- **Browser 进程**：处理浏览器 UI、导航、权限以及协调工作。
- **Renderer 进程**：解析和渲染网页，执行该站点的 JavaScript。
- **GPU/Viz 进程**：负责栅格化、合成与显示相关工作。
- **Utility 等进程**：承担网络、音视频或其他服务，具体划分依浏览器版本而定。

> [!warning]
> 不要死背“一个 Tab 必然对应一个进程”。现代 Chromium 还会根据 Site/Origin Isolation、iframe 和内存压力调整进程分配，这是浏览器的实现细节。

Renderer 内部也有多个线程：

- **主线程**：运行大部分 JavaScript，处理 DOM、事件、样式、布局和绘制等工作。
- **合成线程**：协调滚动、合成和部分动画。
- **栅格线程/辅助线程**：进行图块栅格化、图片解码等工作。
- **Worker**：Web Worker 能在独立的 agent/执行环境中运行 JavaScript。
