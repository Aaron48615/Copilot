---
id: aaron-basic-webpack-canvas-svg
title: Canvas 和 SVG 有什么区别
aliases: [请讲讲：Canvas 和 SVG 有什么区别, 关于“Canvas 和 SVG 有什么区别”，你会怎样回答？]
category: webpack
difficulty: 基础
priority: normal
projects: []
keywords: [Canvas, SVG, 位图, 矢量图]
---

# Canvas 和 SVG 有什么区别

## 核心回答

Canvas 和 SVG 的区别，我会先看画出来的内容是什么。Canvas 通常通过 JavaScript 在画布里绘制，结果按位图像素呈现，单纯放大已有位图可能模糊；SVG 用标签描述矢量图形，像路径、圆和矩形，矢量部分缩放时能保持清晰。

交互上，SVG 里的图形是 DOM 元素，可以单独绑定事件、改属性。Canvas 元素本身也能接收事件，但画布里的每个图形不是独立 DOM，要自己做坐标命中判断和重绘管理。

所以图标、需要独立元素交互的图形可以考虑 SVG，大量图形频繁绘制的场景可以考虑 Canvas，最后仍然要按复杂度测。Canvas 可以设置更合适的绘图分辨率来适应高清屏，也能导出图像；SVG 也可以嵌入位图，但那部分不会因为外面用了 SVG 就自动变成矢量。
