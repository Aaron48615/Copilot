---
id: aaron-basic-javascript-iteration-methods
title: map、forEach、for...in 和 for...of 怎么选择
aliases: [请讲讲：map、forEach、for...in 和 for...of 怎么选择, 关于“map、forEach、for...in 和 for...of 怎么选择”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [map, forEach, for-in, for-of]
---

# map、forEach、for...in 和 for...of 怎么选择

## 核心回答

遍历时，如果要把每一项转换成新结果，用 map；只是给每一项执行操作，用 forEach，它始终返回 undefined，不会把回调返回值收集起来。它们的回调都能拿到当前值、索引和数组，通常跳过稀疏数组的空槽。filter 保留满足条件的项，every 判断是不是全部满足，some 判断有没有满足的，reduce 适合累计结果。map 返回新数组不代表里面的对象也深拷贝了，回调里主动改对象仍然会影响原数据。

for...in 遍历可枚举的字符串属性名，也可能遍历到继承属性，所以常用它遍历对象时要判断自有属性。for...of 遍历可迭代对象的值，数组、字符串、Map、Set 都可以，普通对象可以先用 Object.entries 或 Object.values 转一下。需要 break 或 continue 时，我会选 for 或 for...of，forEach 和 map 中的 return 只能结束当前回调，不能退出整个遍历。

【map 和 forEach 都可以借用于合适的类数组；回调里的 this 取决于函数写法和 thisArg，不能一律说是 window。for...in 不适合作为数组值遍历的默认方式，主要是它遍历属性并可能包含继承项，不是简单地认为现代对象属性完全没有顺序规则。】
