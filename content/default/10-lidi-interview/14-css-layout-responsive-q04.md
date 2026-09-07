---
id: lidi-202609-css-layout-responsive-q04
title: `z-index` 设置很大却不生效，可能是什么原因？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [CSS3, Flex, Grid, 盒模型, position, z-index, rem, vw, 适配]
---

# `z-index` 设置很大却不生效，可能是什么原因？

## 核心回答

1. `z-index` 需要在合适的定位或层叠上下文中比较，不是数字越大就一定覆盖所有元素。
2. 父元素如果形成了独立层叠上下文，子元素的 `z-index` 只能在这个上下文里比较，不能越过父元素和外部元素竞争。
3. `transform`、`opacity`、某些 `position` 和 `isolation` 都可能创建新的层叠上下文。
4. 排查时我会从元素的祖先开始看层叠上下文、定位方式和是否被 `overflow: hidden` 裁剪。

