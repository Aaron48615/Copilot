---
id: lidi-202609-import-01-html-css-css-new-features
title: CSS3 有哪些新特性？
aliases: [css3新特性, css新增属性, css3]
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [选择器, 圆角, 动画, flex]
---

# CSS3 有哪些新特性？

## 核心回答

我按平时真在用的来说：选择器更强了，:nth-child、:not() 这些结构伪类能少写很多类名；视觉上多了圆角、阴影、渐变；transform 能做位移、旋转、缩放；transition 和 @keyframes 让状态过渡和复杂动画都能纯 CSS 实现；布局上是 flex 和 grid；还有媒体查询，响应式就靠它。

这类题我不会把属性名全背成清单，会挑两三个真正理解的特性结合场景说。比如表单校验错误提示的抖动可以用 keyframes，卡片悬浮上浮则是 transition 加 transform。

再补几个现代 CSS：自定义属性就是 CSS 变量，配 var() 使用；calc() 可以混合单位做计算；filter 能做高斯模糊这类滤镜；object-fit 控制图片在容器里的裁切方式。

