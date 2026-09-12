---
id: aaron-basic-vue-large-list-rendering
title: Vue 大列表渲染慢时怎么排查？
aliases: [v-for 数据很多导致卡顿怎么办？, 虚拟列表为什么能改善长列表性能？]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [大列表, 虚拟列表, v-for, computed, 性能排查]
---

# Vue 大列表渲染慢时怎么排查？

## 核心回答

这个得先分清是接口返回慢，还是数据已经拿到了、页面处理和渲染慢。不能只看到列表出来得晚，就认定是 v-for 的问题。

如果是前端耗时，就看模板里有没有每一行都重复做复杂计算，有没有深度监听整个大数组。能提前整理的数据先整理，派生结果用 computed，再检查 key 和传给行组件的数据是否合理。

节点确实太多时，可以分页，或者用虚拟列表，只渲染当前能看到的一段，滚动后再换内容。这样 DOM 会少很多，但也得处理行高、输入框状态和滚动位置。我更偏向先试分页、减少重复计算这些比较直接的办法，确实需要再上虚拟列表，少引入一些复杂度。改完用同样的数据量比较，才知道有没有真的变快。

### 无限列表和长列表

#### 后端一次返回上万条数据，页面卡顿怎么处理

1. **先从数据层减量**：后端分页或游标查询，前端分批请求。
2. **使用虚拟列表**：只渲染视口与 overscan 范围内的少量 DOM，用占位高度保持滚动条。
3. **分批处理大数据**：如果客户端必须做排序、聚合或解析，考虑 Worker。
4. **限制驻留数据**：无限滚动不代表内存中永久保留所有详情数据和图片。

#### 虚拟列表原理

假设定高列表每项高 `itemHeight`：

```js
const start = Math.floor(scrollTop / itemHeight);
const visibleCount = Math.ceil(viewportHeight / itemHeight);
const from = Math.max(0, start - overscan);
const to = Math.min(total, start + visibleCount + overscan);
const offsetY = from * itemHeight;
```

容器保留 `total * itemHeight` 的总高度，实际只把 `[from, to)` 的数据渲染成 DOM，并用 `translateY(offsetY)` 放到对应位置。

#### 不定高列表抖动怎么处理

- 先给合理的估算高度，渲染后用 `ResizeObserver` 测量真实高度。
- 缓存 item key 对应的高度，维护累计偏移。
- 高度修正时保持当前锚点 item 的视觉位置，不要让滚动条突然跳动。

#### 快速滚动时短暂白屏怎么处理

- 增加合理的 **overscan**，在视口前后多渲染几屏或几项。
- 根据滚动方向和速度动态扩大前方缓冲区。
- 确保滚动处理不被频繁测量、复杂渲染或同步数据处理阻塞。

#### 列表 key 怎么选

使用稳定、唯一的业务 ID。列表会插入、删除、排序或虚拟复用时，不要用 index 当 key，否则可能复用错误组件状态。只有内容和顺序永远不变的静态列表，index 才可能接受。

#### 无限滚动和虚拟列表的区别

| 对比 | 无限滚动 | 虚拟列表 |
| --- | --- | --- |
| 解决问题 | 数据如何分批加载 | DOM 如何保持少量 |
| 数据量 | 随滚动增加 | 可以很大 |
| DOM 数量 | 如不另外处理会持续增加 | 保持在可见区附近 |

大数据列表的实用方案常是两者结合：游标分页请求 + 虚拟化 DOM。
