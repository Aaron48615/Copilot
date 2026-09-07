---
id: lidi-202609-import-01-html-css-h5-browser-engine
title: 对浏览器内核的理解？
aliases: [浏览器内核, 渲染引擎, js引擎, blink, webkit]
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [渲染引擎, JS引擎, Blink, V8]
---

# 对浏览器内核的理解？

## 核心回答

浏览器里有渲染引擎和 JavaScript 引擎。渲染引擎负责把 HTML、CSS 变成页面，JavaScript 引擎负责执行脚本。比如 Chromium 常见的组合是 Blink 和 V8，Firefox 是 Gecko 和 SpiderMonkey，Safari 是 WebKit 和 JavaScriptCore。

