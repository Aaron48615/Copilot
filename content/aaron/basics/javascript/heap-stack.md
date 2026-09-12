---
id: aaron-basic-javascript-heap-stack
title: JavaScript 中的堆和栈有什么区别，分别保存什么？
aliases: [调用栈和堆内存的职责有什么不同？, JS 的函数调用和对象内存怎样管理？]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [调用栈, 堆内存, 值传递, 垃圾回收]
---

# JavaScript 中的堆和栈有什么区别，分别保存什么？

## 核心回答

### 先分清两组概念

“堆和栈”在面试中可能指两件不同的事：

1. **数据结构**：栈是后进先出；堆通常是满足特定顺序关系的完全二叉树，常用于优先队列。
2. **运行时内存**：调用栈保存函数执行上下文，堆是运行时管理动态数据的内存区域。

前端面试如果结合 JavaScript、基本类型和引用类型来问，一般指第二组概念。不要把内存中的“堆”解释成二叉堆。

调用栈按后进先出的方式管理函数调用。每次调用函数都会创建栈帧，保存参数、局部状态和返回位置；函数返回后栈帧弹出。它速度快但空间有限，递归过深会造成栈溢出。

堆用于管理生命周期和大小更灵活的数据，例如对象背后的存储。内存不再可达时，由垃圾回收器在合适的时机回收。堆空间通常更大，但分配、访问与垃圾回收的管理更复杂。

| 对比项 | 调用栈 | 堆内存 |
| --- | --- | --- |
| 主要用途 | 管理函数调用和执行上下文 | 管理动态数据 |
| 组织方式 | 后进先出 | 由运行时内存管理器组织 |
| 生命周期 | 通常随函数进入、退出变化 | 由可达性和垃圾回收决定 |
| 常见问题 | 递归过深导致栈溢出 | 内存泄漏、频繁 GC、内存膨胀 |

### 调用栈示例

```js
function multiply(a, b) {
  return a * b;
}

function calculate() {
  return multiply(2, 3);
}

calculate();
```

大致入栈顺序是：全局代码 → `calculate` → `multiply`；返回时按相反顺序出栈。

```js
function recurse() {
  recurse();
}

recurse(); // 最终抛出 RangeError：调用栈空间不足
```

### 基本类型一定在栈、对象一定在堆吗？

这是方便理解赋值行为的简化说法，但不够严谨。ECMAScript 规范描述的是语言语义，并没有规定变量必须物理存放在哪块内存；JavaScript 引擎还会做装箱、逃逸分析、标量替换等优化。

面试时更准确的表达是：

- 原始值按值复制，修改副本不会影响原变量。
- 对象变量保存的是对对象的引用值；复制变量会复制这个引用值，所以两个变量可能指向同一个对象。

```js
let a = 1;
let b = a;
b = 2;
console.log(a); // 1

const user1 = { name: "Ada" };
const user2 = user1;
user2.name = "Grace";
console.log(user1.name); // "Grace"
```

JavaScript 的函数参数都是按值传递。传对象时，复制的是“引用这个对象的值”，不是按引用传参：

```js
function update(user) {
  user.name = "Grace";       // 修改同一个对象
  user = { name: "Linus" }; // 只改变局部变量保存的引用
}

const user = { name: "Ada" };
update(user);
console.log(user.name); // "Grace"
```
