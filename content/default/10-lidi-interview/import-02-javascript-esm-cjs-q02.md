---
id: lidi-202609-import-02-javascript-esm-cjs-q02
title: 循环依赖会发生什么？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [ESM, CommonJS, import, require, tree shaking]
---

# 循环依赖会发生什么？

## 核心回答

循环依赖不一定立刻报错，但模块初始化顺序可能让某个值在初始化完成前就被读取。ESM 会暴露暂时性死区或未初始化绑定，CommonJS 可能拿到不完整的 exports。设计模块时尽量让依赖方向清楚，公共类型或常量可以单独抽一层。
