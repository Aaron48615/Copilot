---
id: lidi-202609-map-and-3d-q03
title: React Three Fiber 是什么？
aliases: []
category: current-interview
difficulty: 项目追问
priority: high
projects: [城市视图]
keywords: [React Three Fiber, Three.js, React Renderer, 3D, 城市视图]
---

# React Three Fiber 是什么？

React Three Fiber

它本质上是 Three.js 的 React Renderer。

原生 Three.js 可能会这样写：

```const mesh = new THREE.Mesh(...)
scene.add(mesh)
```

R3F 允许你直接用 React/JSX：

```<Canvas>
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>
</Canvas>
```

这里的 `<mesh />` 最终对应的还是 Three.js 的 THREE.Mesh。R3F 帮你把 Three.js 的场景、组件生命周期、React 状态这些东西结合起来。

所以面试官问：

React Three Fiber 是什么？

你可以答：

React Three Fiber 是 Three.js 的 React Renderer，主要用来在 React 项目里开发 3D 页面。它把 Three.js 的对象封装成 JSX 的形式，所以可以结合 React 的组件、状态和 Hooks 来管理 3D 场景。我理解底层实际还是 Three.js。
