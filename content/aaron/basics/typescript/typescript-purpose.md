---
id: aaron-basic-typescript-typescript-purpose
title: TypeScript 能帮前端解决什么问题？
aliases: [为什么前端要使用 TypeScript？, TypeScript 相比 JavaScript 有什么好处和限制？]
category: typescript
difficulty: 基础
priority: high
projects: []
keywords: [TypeScript, 静态类型, 类型推断, 接口数据]
---

# TypeScript 能帮前端解决什么问题？

## 核心回答

TypeScript 是在 JavaScript 上加了类型检查。比如函数需要数字，却传了字符串，或者读取了一个不存在的字段，可以在写代码时就看到提示，不必等点到那个页面才发现。

我比较喜欢它在改代码时给的提示。接口数据、组件参数的类型写清楚以后，字段一改名，相关调用位置就能看到提醒，不用全靠自己记着哪里用过。简单变量能推断出来的类型，也不需要每个都手动标一遍。

但它也不是加上就不会报错了。类型信息通常在转成 JavaScript 时被去掉，真实接口返回什么还得运行时判断。我更偏向先把关键数据和函数的类型写清楚，简单的地方保持简单，这样有帮助，也不至于越写越难看懂。
