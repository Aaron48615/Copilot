---
id: aaron-basic-javascript-singleton-pattern
title: 单例模式怎么实现，这段代码为什么得到同一个对象？
aliases: [怎样让多次获取实例返回同一个对象？, 单例第一次传入的名字为什么不会被第二次覆盖？]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [单例模式, 实例缓存, 静态属性]
---

# 单例模式怎么实现，这段代码为什么得到同一个对象？

## 核心回答

单例的核心就是把已经创建的实例保存下来，后面再来获取时，直接返回它，不重新创建。

这里第一次调用 `apple.getInstance('Winner')`，会创建对象并存到 `apple.instance`。第二次传入 `'Looser'` 时，发现实例已经存在，就直接返回第一次那个对象。所以 `Winner === Looser` 是 `true`，名字也还是 `Winner`，第二次传参不会重新初始化它。

这里有两个 `instance`，容易看混。构造函数里的 `this.instance = null` 是每个对象自己的属性；正常用 `apple.getInstance()` 调用时，方法里的 `this` 是 `apple` 这个构造函数，缓存用的是 `apple.instance`。前者并没有参与这个单例判断。

这份实现还依赖调用方统一走 `getInstance()`。如果直接 `new apple()`，仍然能创建新的对象，所以不能说它从语法上禁止了第二个实例。我更偏向把这点讲清楚：它保证的是通过约定入口共享实例。

另外，`getName()` 只是打印名字，没有返回值。原代码末尾的注释不完整，实际依次输出 `true`、`Winner`、`undefined 2`、`Winner`、`undefined 3`。

### 原始示例（注意上文说明的输出注释或接口问题）

```js
/**
 * 单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 * 实现的方法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，
 * 这就确保了一个类只有一个实例对象。
 */
let apple = function(name) {
    this.name = name;
    this.instance = null;
}

apple.prototype.getName = function() {
    console.log(this.name);
}

apple.getInstance = function(name) {
    if (this.instance) {
        return this.instance;
    }
    return this.instance = new apple(name);
}

let Winner = apple.getInstance('Winner');
let Looser = apple.getInstance('Looser');

console.log(Winner === Looser); // true
console.log(Winner.getName(),'2');  // 'Winner'
console.log(Looser.getName(),'3');  // 'Winner'
```
