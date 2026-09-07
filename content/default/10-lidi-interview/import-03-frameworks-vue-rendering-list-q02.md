---
id: lidi-202609-import-03-frameworks-vue-rendering-list-q02
title: watch 深度监听会拖慢吗？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Vue, v-for, 虚拟列表, key, 性能]
---

# watch 深度监听会拖慢吗？

## 核心回答

深度监听会遍历对象并在相关变化时触发，数据大或更新频繁时成本明显。能监听具体字段就不要 deep；需要比较复杂对象时，可以先计算出稳定的摘要或按事件显式通知。性能问题要用 flame chart 证实，不能只凭 API 名字判断。

