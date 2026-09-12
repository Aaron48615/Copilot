---
id: aaron-basic-html-image-loading
title: 网页图片怎样兼顾清晰度和加载性能？
aliases: [响应式图片和懒加载怎样配合？, 怎样减少图片体积与布局偏移？]
category: html
difficulty: 基础
priority: normal
projects: []
keywords: [响应式图片, srcset, LCP, DPR, CLS]
---

# 网页图片怎样兼顾清晰度和加载性能？

## 核心回答

### 图片优化

1. **选对格式**：照片用 AVIF/WebP/JPEG，透明图和精细截图用 WebP/PNG，图标优先 SVG。
2. **压缩和裁剪**：不下发远大于展示尺寸的原图。
3. **响应式图片**：用 `srcset` / `sizes` 让浏览器选尺寸和 DPR 合适的资源。
4. **为图片保留尺寸**：设置 `width` / `height` 或 `aspect-ratio`，减少 CLS。
5. **懒加载非首屏图**：优先用原生 `loading="lazy"`。
6. **LCP 图片不要懒加载**：让它出现在初始 HTML 的 `src/srcset` 中，必要时使用 `fetchpriority="high"`。

```html
<picture>
  <source type="image/avif" srcset="hero-800.avif 800w, hero-1600.avif 1600w">
  <source type="image/webp" srcset="hero-800.webp 800w, hero-1600.webp 1600w">
  <img
    src="hero-800.jpg"
    srcset="hero-800.jpg 800w, hero-1600.jpg 1600w"
    sizes="100vw"
    width="1600"
    height="900"
    fetchpriority="high"
    alt="产品主视觉"
  >
</picture>
```

### 图片为什么在高 DPR 屏上发虚

一张 CSS 显示宽度为 200px 的图，在 DPR = 2 的屏幕上理想需要约 400 物理像素宽的图片资源。可以用 `srcset` 提供 `1x/2x/3x` 图。

```html
<img
  src="avatar.png"
  srcset="avatar.png 1x, avatar@2x.png 2x, avatar@3x.png 3x"
  alt="用户头像"
  width="200"
  height="200"
>
```
