---
id: aaron-basic-javascript-floating-point-double
title: 为什么 0.1 + 0.1 === 0.2
aliases: [为什么两个 0.1 相加能等于 0.2？, 小数表示不精确为什么有时还能比较相等？]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [浮点精度, 舍入, 严格相等]
---

# 为什么 0.1 + 0.1 === 0.2

## 核心回答

### 追问：为什么 0.1 + 0.1 === 0.2

`0.1` 和 `0.2` 都是近似值，但两个 `0.1` 的实际浮点值相加后，舍入结果恰好与 JavaScript 中 `0.2` 的浮点表示相同。“参与运算的数不精确”不代表“每次比较都必然不相等”。
