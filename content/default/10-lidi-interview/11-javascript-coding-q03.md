---
id: lidi-202609-javascript-coding-q03
title: 数组扁平化怎么写？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [debounce, Set, flat, 现场手写, JavaScript]
---

# 数组扁平化怎么写？

## 核心回答

```js
function flatten(list) {
  return list.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}
```

1. 如果只需要处理固定层级，可以使用 `flat(depth)`；如果层级不确定，可以递归处理。
2. 递归版本遇到数组就继续展开，遇到普通值就放进结果数组。
3. 需要注意极深嵌套可能造成递归调用过多，这时可以改成显式栈来实现。
4. 现场回答时我会先给出清晰版本，再说明复杂度和极端情况，不会为了炫技写一个不容易验证的版本。

