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
