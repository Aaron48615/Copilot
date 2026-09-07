---
id: lidi-202609-import-01-html-css-h5-browser-engine-q01
title: JavaScript 执行为什么会影响页面流畅度？
aliases: []
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [渲染引擎, JS引擎, Blink, V8]
---

# JavaScript 执行为什么会影响页面流畅度？

## 核心回答

页面脚本和很多布局、绘制工作都需要主线程。一个同步任务执行太久，主线程就没机会及时处理输入和更新画面。但浏览器还有网络、合成等其他线程，不能理解成执行 JavaScript 时整个浏览器都停止了。

