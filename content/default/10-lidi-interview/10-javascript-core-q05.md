---
id: lidi-202609-javascript-core-q05
title: 深拷贝和浅拷贝有什么区别？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [var, let, const, 闭包, this, 原型链, 事件循环, Promise, 深拷贝]
---

# 深拷贝和浅拷贝有什么区别？

## 核心回答

1. 浅拷贝只复制第一层。对象里的嵌套对象仍然和原对象指向同一个引用，修改嵌套内容可能影响原数据。
2. 深拷贝会递归复制嵌套结构，复制后的对象和原对象没有相同的引用。
3. 展开运算符、`Object.assign` 都是浅拷贝。`JSON.parse(JSON.stringify())` 能处理一部分简单数据，但会丢失 `undefined`、函数、日期等信息，也不能处理循环引用。
4. 如果环境支持，我会根据数据类型考虑 `structuredClone`，或者使用经过验证的工具库。状态更新时也会尽量只复制真正需要修改的层级。

