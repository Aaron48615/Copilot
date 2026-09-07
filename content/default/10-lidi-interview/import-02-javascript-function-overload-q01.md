---
id: lidi-202609-import-02-javascript-function-overload-q01
title: 回调参数为什么有时不能少写？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, overload, union, tuple]
---

# 回调参数为什么有时不能少写？

## 核心回答

函数参数存在逆变约束：一个可能收到更宽参数的回调，不能随便当成只能处理窄类型的回调。开启 strictFunctionTypes 后这类不安全赋值会被拒绝。写事件 API 时要先确定回调真正收到的字段，再让调用者不能误以为能访问不存在的属性。
