---
id: aaron-basic-browser-resource-loading
title: defer、async、preload 和 prefetch 怎么选？
aliases: [脚本延迟执行和资源预加载有什么区别？, 怎么安排页面脚本和资源的加载时机？]
category: browser
difficulty: 基础
priority: high
projects: []
keywords: [defer, async, preload, prefetch, 资源加载]
---

# defer、async、preload 和 prefetch 怎么选？

## 核心回答

这几个可以分成两类来看。defer、async 主要影响脚本什么时候执行，preload、prefetch 主要是提前获取资源。

对于外部普通脚本，defer 可以边解析 HTML 边下载，等文档解析完，再按顺序执行。async 是下载好了就尽快执行，多个脚本之间不保证顺序，所以互相依赖的脚本不能随便全加 async。

preload 更适合当前页面马上要用、但浏览器可能发现得比较晚的资源；prefetch 则偏向下一页可能需要的内容。提前下载不等于已经执行脚本。我更偏向只提前加载首屏确实需要的资源，其他的按需要再拿。全部加预加载看着很积极，实际也会争带宽，反而可能让关键内容更晚出来。

### 网络与加载优化

#### 减少传输量

- JavaScript/CSS/HTML 开启 Brotli 或 gzip 压缩。
- 移除死代码，生产环境压缩代码，避免不必要的 source map 公开下发。
- 分析第三方依赖，避免为一个小功能引入巨大库或重复版本。
- API 只返回必要字段，大列表分页。

#### 减少关键请求链

- 关键 CSS 尽早发现，其他 CSS 按路由或组件分割。
- 普通脚本使用 `defer`；完全独立脚本才考虑 `async`。
- 对确定的关键字体、LCP 图片等谨慎使用 `preload`。
- 对必定访问的第三方源可用 `preconnect`，但连接也有成本，不要滥用。

```html
<link rel="preconnect" href="https://cdn.example.com" crossorigin>
<link rel="preload" as="image" href="/hero.avif" type="image/avif" fetchpriority="high">
<script src="/app.js" defer></script>
```

#### 代码分割和懒加载

首屏只下载当前路由和核心交互必需代码，其他功能在真正要用前加载。

```js
async function loadEditor() {
  const { openEditor } = await import("./heavy-editor.js");
  openEditor();
}
```

```js
// Vue 路由懒加载
const DetailPage = () => import("./pages/DetailPage.vue");
```

```jsx
// React 组件懒加载
const DetailPage = React.lazy(() => import("./DetailPage.jsx"));

<Suspense fallback={<PageSkeleton />}>
  <DetailPage />
</Suspense>
```

> [!warning]
> 分包不是越细越好。过多的小 chunk 会增加请求调度、压缩头损失和加载瀑布链。应按路由、大功能和真实复用边界分割，再用数据验证。

### 延迟加载、懒加载、预加载和预取

| 手段 | 含义 | 适用场景 |
| --- | --- | --- |
| Lazy load | 资源快进入视口或功能真正使用时再加载 | 非首屏图、重组件 |
| Defer | 不阻塞 HTML 解析，等解析完按顺序执行 | 普通页面脚本 |
| Preload | 当前页确定需要，应尽早高优先级下载 | 关键字体、稍晚才能发现的 LCP 资源 |
| Prefetch | 浏览器空闲时为未来导航提前获取 | 高概率下一路由 |

“用 `data-src` + 滚动事件手写图片懒加载”已经不是首选。图片和 iframe 优先使用原生 `loading="lazy"`，复杂可见性场景再使用 `IntersectionObserver`，不要用高频 `scroll` 监听不断计算位置。
