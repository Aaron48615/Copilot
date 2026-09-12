---
id: aaron-basic-javascript-equality-operators
title: == 和 === 有什么区别
aliases: [请讲讲：== 和 === 有什么区别, 关于“== 和 === 有什么区别”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [宽松相等, 严格相等, 类型转换]
---

# == 和 === 有什么区别

## 核心回答

== 比较时可能做类型转换，比如 1 == '1' 是 true；=== 不会为了比较而转换类型，所以 1 === '1' 是 false。我一般优先使用 ===，条件比较会更明确。

如果两边都是对象，比的是不是同一个对象，不是内容看起来是否相同，所以两个分别创建的空对象并不相等。另外 NaN 连它自己也不等，判断可以用 Number.isNaN；null == undefined 是 true，但严格比较是 false。一个等号 = 是赋值，写条件时也要避免和比较混用。

### 值相等和引用相等

对象比较的是两个表达式是否引用同一个对象，不会递归比较内容：

```js
({}) === ({}); // false

const a = { id: 1 };
const b = a;
a === b; // true
```

若要判断两个对象内容是否相等，需要根据业务字段比较，或使用明确支持目标数据类型的深比较方法。
