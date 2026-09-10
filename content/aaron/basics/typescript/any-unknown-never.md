---
id: aaron-basic-typescript-any-unknown-never
title: any、unknown 和 never 有什么区别？
aliases: [未知数据应该用 any 还是 unknown？, never 表示什么，它和 void 一样吗？]
category: typescript
difficulty: 基础
priority: high
projects: []
keywords: [any, unknown, never, 类型收窄, void]
---

# any、unknown 和 never 有什么区别？

## 核心回答

any 基本上是告诉 TypeScript，这个值先别检查了。写起来省事，但后面访问错字段也可能没提示。unknown 则表示我现在还不知道它是什么，得先判断类型，才能放心使用，比如确认是字符串以后再调用字符串方法。

never 表示不会存在这样的值，比如一个函数只会抛错、不会正常返回，也可以用它检查联合类型是不是还有情况没处理。它和 void 不一样，void 常用来表示调用方不关心返回值，函数还是可以正常执行结束的。

外部传来的数据，我更偏向 unknown。虽然要多写几步判断，但至少能提醒我哪些地方还没确认。实在需要 any，就把它限制在小范围里，不然一路传下去，后面的类型提示也跟着没了。
