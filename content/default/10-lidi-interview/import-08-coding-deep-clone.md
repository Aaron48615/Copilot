---
id: lidi-202609-import-08-coding-deep-clone
title: 深拷贝题怎样说明能力边界？
aliases: [手写深拷贝, structuredClone, 循环引用]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [深拷贝, 循环引用, structuredClone]
---

# 深拷贝题怎样说明能力边界？

## 核心回答

1. 先说输入范围再写实现，别把任意 JavaScript 对象都当成普通属性集合。下面只支持普通对象、数组和非函数、非 Symbol 的基本值，只复制自有可枚举字符串数据属性，支持循环和共享引用，访问器与其他对象类型明确拒绝。

2. 核心是先建副本并缓存，再递归填充；数组按原长度创建，可以保留空槽。定义数据属性而不是直接赋值，也能避免 `__proto__` 这个键触发普通对象的原型设置逻辑，但这仍不是处理任意代理对象的安全沙箱。

    ```js
    function cloneData(x, seen = new WeakMap()) {
      if (typeof x === 'function' || typeof x === 'symbol')
        throw new TypeError('Unsupported value');
      if (x === null || typeof x !== 'object') return x;
      if (seen.has(x)) return seen.get(x);
      const array = Array.isArray(x), proto = Object.getPrototypeOf(x);
      if (!array && proto !== Object.prototype && proto !== null)
        throw new TypeError('Unsupported object');
      const out = array ? new Array(x.length) : Object.create(proto);
      seen.set(x, out);
      for (const key of Object.keys(x)) {
        const d = Object.getOwnPropertyDescriptor(x, key);
        if (!('value' in d)) throw new TypeError('Accessor unsupported');
        Object.defineProperty(out, key, {
          value: cloneData(d.value, seen),
          writable: true, enumerable: true, configurable: true
        });
      }
      return out;
    }
    ```

3. 这段代码不会保留只读等属性描述符，也不会复制 Symbol 键或非枚举字段，调用方不该拿它复制类实例。题目增加 Date、Map、Set，就按类型加分支，Map 的键和值、Set 的成员也要用同一个缓存递归处理。

4. 实际处理受支持的数据快照时，可以优先考虑 `structuredClone`，它支持多种内建类型及循环引用。它也不是完整对象行为复制器，函数和普通 DOM 节点不能直接克隆，自定义类原型、访问器和属性描述符也不会原样保留。

5. 要验证副本与原对象隔离、共享子对象仍共享、自引用指向副本，以及不支持类型能明确报错。JSON 往返只适合接受其转换规则的数据，不能当通用替代：对象中的 undefined 会丢失，日期通常变字符串，循环结构会失败。

## 追问：为什么复制 Map 时，键也要递归处理？

1. Map 的键是对象，直接复用原键就留下一条指向原对象图的引用。目标是「生成完整独立副本」，就同时克隆键和值。业务需要保留外部对象作为查询键，则要另行说明这属于保留键引用的定制策略。

2. Map 本身也可能参与循环，比如把自己当作值，所以应先创建空 Map 并放进映射，再遍历条目。键和值必须共用整个克隆过程的缓存，才能保留某个对象既出现在普通属性里、又作为 Map 键时的同一身份关系。

3. 这会影响使用方式：克隆后的 Map 通常不能再用原来的对象键直接查询，因为键的身份已经变了。若有 `source.key` 和 `source.map`，应通过 `copy.key` 查询 `copy.map`。用这个例子解释「内容一样」和「引用相同」的区别。

## 追问：structuredClone 为什么不适合直接复制自定义类实例？

1. 类实例除了公开字段，还可能依赖原型方法、私有字段和构造时建立的不变量。structuredClone 对普通自定义实例不会保留这些类行为，即使公开数据成功复制，返回值也不能直接当成一个同样可用的实例。

2. 需要恢复行为的对象，让类提供明确的数据导出和重建方式，比如先导出可序列化字段，再通过构造函数验证后生成实例。直接把原型接回去也不一定正确，因为私有字段和内部状态不会因此自动补齐。

3. 业务只是要展示或传输数据，普通数据对象反而更合适，不需要带着整个实例。选标准克隆前仍要检查是否含函数、DOM 节点等不支持内容，并处理克隆失败，别把浏览器提供的方法理解成所有类型都能无损复制。
