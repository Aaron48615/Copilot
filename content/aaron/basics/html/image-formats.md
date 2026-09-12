---
id: aaron-basic-html-image-formats
title: PNG、JPEG、GIF 有什么区别，图片格式怎么选？
aliases: [照片和透明图片分别适合什么格式？, PNG 与 JPG 和 GIF 的压缩及透明能力有何差别？]
category: html
difficulty: 基础
priority: normal
projects: []
keywords: [PNG, JPEG, GIF, WebP, AVIF]
---

# PNG、JPEG、GIF 有什么区别，图片格式怎么选？

## 核心回答

- **JPEG/JPG** 使用有损压缩，不支持透明，适合颜色丰富的照片；压缩率高，但反复编辑、保存会损失质量，文字和锐利边缘容易出现压缩痕迹。
- **PNG** 使用无损压缩，支持 Alpha 半透明，适合 Logo、图标、截图和 UI 素材；细节清晰，但照片通常比 JPEG/WebP 更大。
- **GIF** 是基于调色板的格式，每帧最多使用 256 种颜色，支持动画和简单透明；适合小型简单动画，不适合真彩照片和高质量长动画。

### 对比表

| 格式 | 压缩方式 | 透明 | 动画 | 颜色与画质 | 典型场景 |
| --- | --- | --- | --- | --- | --- |
| JPEG/JPG | 有损 | 不支持 | 不支持 | 适合连续色调，压缩率高 | 照片、商品图、背景图 |
| PNG | 无损 | 支持完整 Alpha 通道 | 标准 PNG 通常不用于动画 | 线条、文字、色块清晰 | Logo、图标、截图、透明素材 |
| GIF | 调色板压缩 | 支持简单透明，不支持平滑 Alpha | 支持 | 每帧最多 256 色 | 表情、小型循环动画 |

`JPG` 和 `JPEG` 是同一种格式，只是扩展名写法不同。

### 分别展开

#### JPEG

JPEG 会丢弃人眼相对不敏感的图像信息，因此同等视觉效果下通常能把照片压得很小。但它不适合包含大量文字、细线、纯色块的 UI 图，因为边缘容易出现噪点和色块。

#### PNG

PNG 能无损保存像素信息，适合需要透明背景或锐利边缘的图片。常说的 PNG-8、PNG-24、PNG-32 是工具链中的常用分类：PNG-8 通常使用较小的调色板，PNG-24 表示真彩色，PNG-32 通常表示真彩色再加 8 位 Alpha；它们不是三个独立的网络协议。

#### GIF

GIF 的每一帧使用索引色调色板，所以复杂渐变和照片容易失真。它支持多帧动画、兼容性好，但长时间或高帧率动画体积和解码成本都可能很高，也不带音频。此类内容更适合用 WebM、MP4 或动画 WebP。

### 现代项目怎么选

可以按下面的顺序判断：

1. 矢量图标、简单 Logo：优先 SVG。
2. 照片：优先考虑 AVIF/WebP，并提供 JPEG 兜底。
3. 需要无损细节或透明的位图：PNG，或评估无损 WebP/AVIF。
4. 简单兼容动画：GIF；复杂或较长动画优先视频格式。

```html
<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img
    src="hero.jpg"
    width="1200"
    height="800"
    alt="商品展示"
  />
</picture>
```

`<picture>` 会让浏览器从支持的格式中选择第一项，`img` 是兼容兜底。只修改文件扩展名并不会真正转换编码格式。
