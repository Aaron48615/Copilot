---
id: h5-browser-engine
title: 对浏览器内核的理解？
aliases: [浏览器内核, 渲染引擎, js引擎, blink, webkit]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [渲染引擎, JS引擎, Blink, V8]
---

# 对浏览器内核的理解？

## 核心回答

浏览器里有渲染引擎和 JavaScript 引擎。渲染引擎负责把 HTML、CSS 变成页面，JavaScript 引擎负责执行脚本。比如 Chromium 常见的组合是 Blink 和 V8，Firefox 是 Gecko 和 SpiderMonkey，Safari 是 WebKit 和 JavaScriptCore。

## 追问：JavaScript 执行为什么会影响页面流畅度？

页面脚本和很多布局、绘制工作都需要主线程。一个同步任务执行太久，主线程就没机会及时处理输入和更新画面。但浏览器还有网络、合成等其他线程，不能理解成执行 JavaScript 时整个浏览器都停止了。
