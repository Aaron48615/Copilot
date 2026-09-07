---
id: lidi-202609-import-01-html-css-container-query-q01
title: 容器查询会带来什么坑？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [container query, media query, 响应式, CSS]
---

# 容器查询会带来什么坑？

## 核心回答

容器建立了新的尺寸计算边界，百分比、绝对定位和样式继承要按实际结构检查；嵌套容器选错名字也可能让规则没有命中。老浏览器兼容性和降级样式要看项目支持范围。上线前用不同容器宽度而不只是拖浏览器窗口测试。

