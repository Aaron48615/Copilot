---
id: aaron-basic-javascript-deep-shallow-copy
title: 深拷贝和浅拷贝有什么区别，怎么选择
aliases: [请讲讲：深拷贝和浅拷贝有什么区别，怎么选择, 关于“深拷贝和浅拷贝有什么区别，怎么选择”，你会怎样回答？]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [深拷贝, 浅拷贝, 引用类型, structuredClone]
---

# 深拷贝和浅拷贝有什么区别，怎么选择

## 核心回答

浅拷贝只复制最外面一层，得到的外层对象是新的，但里面嵌套的对象、数组还是共享引用。比如复制了一份用户信息，再修改里面的 address.city，原对象也可能跟着变。展开运算符和 Object.assign 都属于常见的浅拷贝。

深拷贝会继续复制嵌套数据，让它们和原对象分开。简单的 JSON 数据可以用 JSON.parse(JSON.stringify(obj))，但它会丢失对象里的 undefined 和函数，Date 会变成字符串，循环引用和 BigInt 还会出错。需要复制的类型比较丰富时，可以考虑 structuredClone，它支持循环引用和多种内置类型，但不能克隆函数、DOM 节点等内容。

我会先看是不是确实需要整份复制。有时候只是更新对象的某一层，把需要修改的那条路径复制出来就够了，不一定每次都做深拷贝。

```js
const next = { ...user, address: { ...user.address, city: '哈尔滨' } };
```

【如果自己写递归深拷贝，要区分数组和对象，用 WeakMap 记录已经复制过的对象来处理循环引用，并明确 Date、Map、Set 等类型是否支持。】

### 嵌套对象的浅拷贝示例

展开语法和 `Object.assign()` 只复制一层；嵌套对象仍可能共享引用。

```js
const source = { profile: { age: 18 } };
const copy = { ...source };
copy.profile.age = 20;
console.log(source.profile.age); // 20
```
