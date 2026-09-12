---
id: aaron-basic-css-hairline-dpr
title: 1px 在不同设备上为什么有粗有细
aliases: [移动端 1px 边框为什么不够细？, 高 DPR 屏幕的发丝线怎么实现？]
category: css
difficulty: 基础
priority: normal
projects: []
keywords: [1px, DPR, 伪元素, transform]
---

# 1px 在不同设备上为什么有粗有细

## 核心回答

CSS 中的 `1px` 是 **1 个 CSS 像素**，不一定等于 1 个屏幕物理像素。设备像素比 `DPR = 物理像素 / CSS 像素`，所以 DPR 为 2 时，`1px` 线在厚度方向通常由 2 排物理像素绘制；DPR 为 3 时通常由 3 排绘制。与“1 物理像素的发丝线”相比，它就会显得更粗。

最常用的解决方案是用伪元素画 `1px` 的线，再根据 DPR 用 `transform` 缩放；如果项目允许，也可直接用 `0.5px`，但实际渲染会受浏览器、缩放和像素对齐影响。

### CSS 像素、物理像素和 DPR

- **CSS 像素**：布局使用的逻辑单位，就是 CSS 里的 `px`。
- **物理像素**：屏幕上真实的发光点。
- **DPR**：`window.devicePixelRatio`，表示一个 CSS 像素边长大约对应多少个物理像素。

| 设备环境 | 1 CSS px 的边长大约对应 | 1px 横线的物理厚度 |
| --- | ---: | ---: |
| DPR = 1 | 1 个物理像素 | 1 排像素 |
| DPR = 2 | 2 个物理像素 | 2 排像素 |
| DPR = 3 | 3 个物理像素 | 3 排像素 |

> [!note]
> DPR = 2 时，1 CSS px 覆盖的是约 `2 × 2` 个物理像素；说边框厚度时，才是厚度方向的 2 排像素，不要把面积和厚度混在一起。

`devicePixelRatio` 也不是永远固定的。浏览器页面缩放、系统缩放、外接不同屏幕，都可能改变它。

### 为什么看起来不一样

1. **DPR 不同**：`1px` 映射到的物理像素数不同。
2. **屏幕像素密度不同**：同样数量的物理像素，实际物理尺寸未必相同。
3. **像素未对齐**：位置或缩放后落在分数像素上，浏览器会抗锯齿，线可能发虚或深浅不一。
4. **页面缩放和渲染引擎差异**：最终会发生像素取整或子像素渲染。

所以“高 DPR 屏上 `1px` 必然物理尺寸更粗”也不够严谨。更准确的说法是：**设计稿要的如果是 1 物理像素发丝线，`border: 1px` 在高 DPR 屏上会用多排物理像素渲染，因而不够细**。

### 解决 1px 发丝线

#### 方案一：伪元素 + transform

这是常用且可控的方案。不改变元素布局，只缩放伪元素画出的线。

```css
.hairline-bottom {
  position: relative;
}

.hairline-bottom::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: #d9d9d9;
  transform-origin: 0 100%;
  pointer-events: none;
}

@media (min-resolution: 2dppx) {
  .hairline-bottom::after {
    transform: scaleY(0.5);
  }
}

@media (min-resolution: 3dppx) {
  .hairline-bottom::after {
    transform: scaleY(0.333333);
  }
}
```

`transform` 只影响绘制，不重新占据布局空间。如果要画四边框，可以让伪元素宽高扩大到 `200%`，再整体 `scale(0.5)`。

#### 方案二：分数像素

```css
.card {
  border-bottom: 0.5px solid #d9d9d9;
}
```

写法最简单，现代浏览器普遍能解析分数 CSS 像素。但是最终仍可能因 DPR、坐标对齐和缩放发生抗锯齿或像素取整，应在目标机型上验收。

#### 方案三：不强求“一个物理像素”

如果只是需要视觉分隔，可以用低对比度的 `1px` 边框、渐变或阴影。这类方案的目标是“观感细”，不是严格占 1 个物理像素。
