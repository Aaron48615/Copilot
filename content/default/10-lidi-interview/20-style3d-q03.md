---
id: lidi-202609-style3d-q03
title: 网页里的 3D 为什么容易有性能问题？
aliases: []
category: current-interview
difficulty: 项目追问
priority: high
projects: [style3D]
keywords: [style3D, 3D, 性能, GPU, Draw Call, 模型压缩, 纹理压缩]
---

# 网页里的 3D 为什么容易有性能问题？

至少会这一句：

“3D 页面除了普通 DOM 渲染，还会涉及 GPU 渲染、模型、纹理和动画，所以模型面数、纹理大小、Draw Call 数量以及每帧计算量都会影响性能。实际开发里可以从模型压缩、纹理压缩、减少重复渲染、按需加载这些方向优化。”

别主动展开 Shader。
