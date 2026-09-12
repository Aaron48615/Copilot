---
id: aaron-basic-browser-frontend-performance
title: 前端性能优化
aliases: [请讲讲：前端性能优化, 关于“前端性能优化”，你会怎样回答？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [性能优化, CDN, 懒加载, DOM]
---

# 前端性能优化

## 核心回答

> 沿用你的回答，末尾补充相关解释。

我先从网络和资源说，可以使用雪碧图、懒加载、合并加载、压缩JS和CSS文件，以减少HTTP请求。还可以用CDN，也就是内容分发网络，把常用文件放到离用户更近的节点上，加快资源加载。还要控制cookie的大小，设置合理的过期时间。

再从页面和渲染上看，要减少DOM操作，减少重排重绘，合理使用标签和选择器，避免无意义的复杂结构。

【进一步展开时，可以补缓存策略、gzip/Brotli、路由懒加载、长列表虚拟化、读写 DOM 分离，以及 Performance 面板定位长任务。请求合并和雪碧图要结合协议、缓存和加载时机取舍，最后通过优化前后的数据验证，而不是只统计用了多少种手段。】

### 标准优化流程

1. **设置基线**：记录版本、设备、网络和指标。
2. **定位瓶颈**：看 Network 瀑布图、Performance flame chart、Coverage 和 bundle analyzer。
3. **按影响排序**：先解决影响主要用户和核心路径的大问题。
4. **一次改一类变量**：方便归因，避免“感觉变快了”。
5. **重新测量**：对比 p50/p75/p95，同时检查功能、无障碍和业务指标。
6. **设置性能预算**：对 JS 体积、图片、LCP、长任务等设置 CI 门禁和线上告警。

### 字体优化

- 只下载实际使用的字重和字符集，使用 WOFF2。
- 使用 `font-display` 在文本可见性和字体切换之间取舍。
- 只预加载首屏确定会用的字体。
- 选择尺寸接近的 fallback 字体，必要时用字体度量调整属性降低 CLS。

```css
@font-face {
  font-family: "App Sans";
  src: url("/fonts/app-sans.woff2") format("woff2");
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}
```

### 渲染和主线程优化

#### 减少长任务，优化 INP

主线程上的大块 JavaScript 会阻止输入处理和下一帧绘制。常见处理方法：

- 拆分长循环，主动让出主线程。
- 用 Web Worker 处理大数据计算、解析、压缩等 CPU 密集任务。
- 减少第三方脚本，延迟非核心 SDK 初始化。
- 交互处理器先做必要反馈，再延后低优先级工作。

#### 避免布局抖动

如果在循环中交替读取布局属性和修改样式，浏览器可能被迫反复同步 layout。

```js
// 差：每次写入后立即读布局
for (const item of items) {
  item.style.width = `${container.offsetWidth / 2}px`;
}

// 好：先批量读，再批量写
const width = container.offsetWidth / 2;
for (const item of items) {
  item.style.width = `${width}px`;
}
```

`offsetWidth`、`getBoundingClientRect()` 等读取在前面有未处理样式变更时，可能触发强制同步布局。

#### 降低绘制和合成成本

- 动画优先改变 `transform` 和 `opacity`，避免每帧修改会引起布局的属性。
- 谨慎使用大范围模糊、阴影、滤镜和大固定背景。
- `will-change` 只对即将变化且数量可控的元素使用，滥用会占用显存。
- 对长页面可评估 `content-visibility: auto`，同时测试无障碍、锚点和尺寸预估。

### 框架层优化

- 将状态放在真正需要的最小作用域，避免一个高层状态让大量组件重新渲染。
- 计算结果较贵且输入稳定时再使用 memoization；不要为了“看起来优化”到处加 `memo/useMemo/useCallback`。
- 长列表使用虚拟化，复杂搜索使用防抖、取消过期请求和结果缓存。
- 首屏需要 SEO 或快速显示内容时，评估 SSR/SSG/流式渲染；同时注意 hydration 的 JS 和 CPU 成本。
- 使用框架 Profiler 找出真正的频繁渲染和慢组件，不要凭感觉猜。
