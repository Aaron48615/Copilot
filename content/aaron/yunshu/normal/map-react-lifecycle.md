---
id: yunshu-normal-map-react-lifecycle
title: 难点二：把高德地图的命令式对象放进 React 生命周期
aliases: [能讲讲项目中的命令式地图对象与 React 生命周期吗？, 关于命令式地图对象与 React 生命周期，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [难点, useRef, 清理函数, 地图实例]
---

# 难点二：把高德地图的命令式对象放进 React 生命周期

## 核心回答

地图实例不会跟 React 状态变化自动销毁。切到环境模式时，只创建 Circle，旧 Marker 和事件还会留下，所以我用 useRef 保存实例、覆盖物和事件绑定，模式或数据变化时先清旧的，再创建新的。

卸载时会断开尺寸监听、关闭信息窗体、销毁地图，避免反复进入页面后残留。

【开发严格模式额外执行挂载和清理，更容易暴露重复实例。SDK 加载不能真正取消，只用 active 忽略卸载后的结果；覆盖物多了还要做点聚合。验证时会反复切模式、改容器尺寸和进出页面，检查覆盖物数量与监听状态。】

## 回答要点

- 地图实例不会跟 React 状态变化自动销毁。
- 卸载时会断开尺寸监听、关闭信息窗体、销毁地图，避免反复进入页面后残留。
- 开发严格模式额外执行挂载和清理，更容易暴露重复实例。

## 面试官可能追问

- SDK 加载不能真正取消时如何避免卸载后建实例？
- 开发严格模式会怎样暴露清理不完整的问题？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Map.tsx，第 185～234 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:185)：第三方实例引用、统一清理以及异步 SDK 的 active 标记。
> - [Map.tsx，第 295～322 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：地图实例和 ResizeObserver 生命周期。
> - [Map.tsx，第 324～387 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:324)：模式变化时覆盖物及点击事件的替换过程。
