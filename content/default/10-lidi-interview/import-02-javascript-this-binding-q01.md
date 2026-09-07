---
id: lidi-202609-import-02-javascript-this-binding-q01
title: 为什么 setTimeout 里的 this 常出问题？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [this, 箭头函数, bind, call, apply]
---

# 为什么 setTimeout 里的 this 常出问题？

## 核心回答

把普通方法直接传给 setTimeout 后，定时器只拿到一个函数引用，调用时没有原来的对象接收者，this 就变了。可以用箭头函数包住调用、提前 bind，或把需要的数据显式传进回调。选哪种取决于是否需要保留动态 this，不能只靠记忆口诀。
