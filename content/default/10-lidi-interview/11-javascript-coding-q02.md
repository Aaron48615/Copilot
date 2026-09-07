---
id: lidi-202609-javascript-coding-q02
title: 数组去重怎么写？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [debounce, Set, flat, 现场手写, JavaScript]
---

# 数组去重怎么写？

## 核心回答

```js
function unique(list) {
  return [...new Set(list)];
}
```

1. `Set` 只能直接处理值的唯一性，适合数字、字符串和基础值数组。
2. 如果是对象数组，要先明确根据哪个字段去重，例如商品 ID，而不是直接把对象放进 `Set`，因为两个内容相同但引用不同的对象仍然会被认为不同。
3. 根据商品 ID 去重时，可以用 `Map` 保存第一次出现的对象，或者用 `filter` 配合已见过的 ID 集合。
4. 我会先问清楚“重复”的判断标准，再选择实现，不会默认所有数组都能用同一段代码。

