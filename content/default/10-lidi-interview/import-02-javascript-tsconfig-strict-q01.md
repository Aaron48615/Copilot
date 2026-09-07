---
id: lidi-202609-import-02-javascript-tsconfig-strict-q01
title: strictNullChecks 为什么有用？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [tsconfig, strict, strictNullChecks, noImplicitAny]
---

# strictNullChecks 为什么有用？

## 核心回答

很多线上错误就是“以为一定存在，实际是 undefined”。开启后，数组查找、可选字段和接口空值都需要明确处理，代码会多几行判断，但错误会更早暴露。
