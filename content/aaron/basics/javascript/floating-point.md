---
id: aaron-basic-javascript-floating-point
title: 为什么 0.1 + 0.2 !== 0.3
aliases: [为什么 JS 小数相加会出现精度误差？, 0.1 加 0.2 为什么不严格等于 0.3？]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [浮点精度, IEEE754, Number, 容差, 金额]
---

# 为什么 0.1 + 0.2 !== 0.3

## 核心回答

JavaScript 的 `Number` 采用 **IEEE 754 双精度二进制浮点数**。`0.1` 和 `0.2` 转成二进制后都是无限循环小数，64 位浮点数只能保留有限位数，因此存的是舍入后的近似值。两个近似值相加后得到 `0.30000000000000004`，与 `0.3` 自身的近似值不是同一个浮点数，所以严格相等为 `false`。

```js
0.1 + 0.2;          // 0.30000000000000004
0.1 + 0.2 === 0.3;  // false
```

这不是 JavaScript 独有的 Bug，很多使用 IEEE 754 二进制浮点数的语言都会有类似现象。

### 为什么十进制小数无法精确表示

十进制的 `0.1` 类似于十进制中的 `1 / 3 = 0.333...`：换了进制后它会无限循环。

```text
0.1₁₀ = 0.00011001100110011...₂
0.2₁₀ = 0.00110011001100110...₂
```

二进制有限小数只能精确表示分母约分后是 `2ⁿ` 的数，例如 `0.5 = 1/2`、`0.25 = 1/4`。`0.1 = 1/10`的分母含有因子 5，所以不能用有限二进制小数表示。

### IEEE 754 双精度如何存储

`Number` 逻辑上对应 binary64，共 64 位：

| 部分 | 位数 | 作用 |
| --- | ---: | --- |
| 符号位 | 1 | 表示正负 |
| 指数位 | 11 | 表示数值的数量级 |
| 尾数位 | 52 | 保存有效数字，规格化数还有 1 位隐含的前导 `1` |

因此通常说它有 **53 位二进制有效精度**。无限循环的部分必须舍入；运算时的对阶、运算结果再舍入，也可能继续引入误差。

> [!important]
> 不要说成“超过 52 位后被直接截断”。IEEE 754 通常会按规则**舍入**，JavaScript 规范的默认思路是舍入到最接近、中间值取偶数（round ties to even）。

### 正确比较浮点数

#### 方案一：按业务容差比较

```js
function nearlyEqual(a, b, tolerance = 1e-10) {
  return Math.abs(a - b) <= tolerance;
}

nearlyEqual(0.1 + 0.2, 0.3); // true
```

`tolerance` 应根据业务精度设置，不是所有场景都盲目使用 `Number.EPSILON`。

#### 方案二：同时考虑数值量级

`Number.EPSILON` 是 1 与大于 1 的下一个可表示数之间的差，它只代表 **1 附近**的精度。更大数值应使用相对容差：

```js
function nearlyEqual(a, b, factor = 4) {
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) <= Number.EPSILON * scale * factor;
}
```

`factor` 仍需根据容许多少次舍入误差来设置。对测量、金融、科学计算，容差策略并不相同。

### 金额和高精度计算怎么做

#### 小数位固定时：放大为整数

```js
const priceInCents = 10;  // 0.10 元
const feeInCents = 20;    // 0.20 元
const totalInCents = priceInCents + feeInCents;

console.log((totalInCents / 100).toFixed(2)); // "0.30"
```

从数据入口就使用“分”等最小单位，比先用小数运算、再乘 100 更可靠。同时要检查结果是否超出 `Number.MAX_SAFE_INTEGER`。

#### 小数位不固定时：使用十进制库

金融或任意精度小数通常使用 `decimal.js`、`big.js` 等十进制库，或在后端/数据库使用 Decimal 类型。

```js
// 示意：需要安装 decimal.js
import Decimal from "decimal.js";

new Decimal("0.1").plus("0.2").equals("0.3"); // true
```

`BigInt` 只解决任意大的**整数**，不能直接表示 `0.1`这样的小数。

### 常见误区

- `toFixed()` 主要用于格式化，返回的是字符串，不会让之前的运算变成精确十进制运算。
- `Number.EPSILON` 不是通用业务误差，数值越大，相邻浮点数的间隔通常越大。
- 不要将金额直接用浮点数做严格相等、连续累加或对账。
