---
id: lidi-202609-import-01-html-css-css-flex-one
title: flex:1 是哪些属性的复合属性？
aliases: [flex属性, flex-grow, flex-shrink, flex-basis, flex等分]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [flex, flex-grow, flex-shrink, flex-basis]
---

# flex:1 是哪些属性的复合属性？

## 核心回答

flex 是 flex-grow、flex-shrink 和 flex-basis 的缩写。浏览器通常把 flex: 1 展开成 1 1 0%，意思是允许放大、允许缩小，分配空间时以 0% 为基础。

flex: auto 对应 1 1 auto，会先考虑项目原本的尺寸，再分配剩余空间。所以几项内容长短不同，用 flex: auto 不一定等宽。

