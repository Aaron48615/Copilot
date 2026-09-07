---
id: lidi-202609-import-03-frameworks-vue-reactive-boundary
title: Vue 3 的响应式是怎么工作的？
aliases: [Proxy 响应式, computed 缓存, Vue 依赖收集]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, track, trigger, computed, 响应式]
---

# Vue 3 的响应式是怎么工作的？

## 核心回答

Vue 3 用 Proxy 代理对象。读取属性时，如果当前有正在运行的副作用，就把它记录为这个属性的依赖；修改属性时，再把依赖它的副作用安排重新执行。computed 在这个基础上缓存计算结果，依赖没变时不会每次都重新算。

这只是理解模型，真实实现还涉及嵌套对象、数组、Map、Set、调度队列和递归触发。面试里我会先把“读取收集、修改触发、computed 缓存”讲清楚，再说明自己没有把源码每一行都背下来。

