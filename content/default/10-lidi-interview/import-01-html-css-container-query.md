---
id: lidi-202609-import-01-html-css-container-query
title: 容器查询和媒体查询怎么选？
aliases: [container query, 容器查询, 响应式断点]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [container query, media query, 响应式, CSS]
---

# 容器查询和媒体查询怎么选？

## 核心回答

媒体查询看的是视口，适合页面级导航、整体布局和设备能力；容器查询看组件实际拿到的容器宽度，同一个卡片放在侧栏或主内容区时可以自己决定横排还是竖排。组件需要参与查询的父元素要设置 container-type，断点应从内容何时拥挤来定，而不是照搬手机、平板、桌面的设备型号。

