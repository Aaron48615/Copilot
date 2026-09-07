---
id: lidi-202609-import-02-javascript-generic-api-q03
title: 为什么不直接把所有接口返回都写成 any？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [泛型, API, Promise, response, TypeScript]
---

# 为什么不直接把所有接口返回都写成 any？

## 核心回答

短期省事，后面字段改名时编译器帮不上忙，组件也容易把数字当字符串用。泛型让公共部分保持复用，具体接口保留类型，维护成本反而更低。
