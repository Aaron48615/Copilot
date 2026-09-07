---
id: lidi-202609-import-01-html-css-modern-layout
title: Flex 和 Grid 怎么根据场景选择？
aliases: [Flex Grid 选择, CSS 两维布局, 响应式卡片布局]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Flex, Grid, minmax, auto-fit, 布局]
---

# Flex 和 Grid 怎么根据场景选择？

## 核心回答

Flex 更像是在一条主轴上排东西，适合导航、工具栏、表单行和一维对齐；Grid 同时管理行和列，适合卡片墙、仪表盘这类二维布局。实际项目里两者经常嵌套，并不是选了 Grid 就不能用 Flex。

响应式卡片可以用 `repeat(auto-fit, minmax(...))`，让浏览器根据容器宽度决定列数。尺寸要由内容和最小可用宽度决定，不能只按几个常见手机型号写死。

