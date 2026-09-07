---
id: lidi-202609-javascript-core-q08
title: 原型链是什么？你在项目中怎么理解它？
aliases: []
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [var, let, const, 闭包, this, 原型链, 事件循环, Promise, 深拷贝]
---

# 原型链是什么？你在项目中怎么理解它？

## 核心回答

1. JavaScript 对象可以通过原型关联到另一个对象。访问一个属性时，如果当前对象没有，就会沿着原型链继续查找。
2. 函数有 `prototype`，通过 `new` 创建实例时，实例可以访问构造函数原型上的方法。
3. 我在业务开发中不太会手动修改原型链，更多是理解数组方法、类和第三方库为什么能共享方法。
4. 面试时我会把重点放在“属性查找会沿原型链进行”以及“实例和构造函数原型的关系”，不会把它和继承、闭包混成一个概念。

