---
id: js-map-vs-foreach
title: map 和 forEach 有什么区别？
aliases: [map, forEach, 数组遍历, 遍历区别]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [map, forEach, 返回值, 遍历, break]
---

# map 和 forEach 有什么区别？

## 核心回答

map 适合把数组转换成另一个数组，比如把商品对象转换成只包含名称的数组。它会收集每次回调的返回值，组成新数组。forEach 只是逐项执行操作，返回值是 undefined，比如遍历时记录日志。

两者本身都不会自动深拷贝元素。如果回调修改了元素里的对象属性，原数组中的对象也会跟着变。

## 追问：forEach 里写 async，外面会等它完成吗？

不会。forEach 不会等待回调返回的 Promise。需要并行等待时，可以用 map 生成 Promise 数组再交给 Promise.all；需要按顺序执行时，可以用 for...of 配合 await。
