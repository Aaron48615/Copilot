---
id: lidi-202609-import-08-coding-array-object-utils
title: flatten、groupBy、去重和分页题怎么讲取舍？
aliases: [手写 flatten, groupBy, 数组去重, 分页]
category: current-interview
difficulty: 基础
priority: high
projects: []
keywords: [flatten, groupBy, 去重, 分页]
---

# flatten、groupBy、去重和分页题怎么讲取舍？

## 核心回答

1. 先说输入怎么算、结果怎么留：是不是只处理普通数组、能不能改输入、去重留哪一条、页码从几开始。下面按普通稠密数组写教学版，对象元素还是原来的引用；不是把标准库所有特殊行为都覆盖了。

2. flatten 如果只展开一层，遍历并追加子元素就行；全部展开可以用下面的迭代栈，逆序入栈保证输出顺序。这里约定没有循环引用，也不实现原生 flat 的深度参数和空槽规则。显式栈避开的是函数递归过深，不是无限降低内存占用。

   ```js
   function flatten(items) {
     const stack = [...items].reverse(), out = [];
     while (stack.length) {
       const x = stack.pop();
       if (Array.isArray(x)) {
         for (let i = x.length - 1; i >= 0; i--) stack.push(x[i]);
       } else out.push(x);
     }
     return out;
   }
   ```

3. groupBy 的关键是键怎么比。用 Map 收集，对象本身可以当键，也避开普通对象原型属性干扰分组。下面保留遍历顺序和元素引用；接口最终要 JSON 对象的话，还得额外定键的序列化规则，不能直接把任意对象键当字符串。

   ```js
   function groupBy(items, keyOf) {
     const groups = new Map();
     for (const item of items) {
       const key = keyOf(item);
       if (!groups.has(key)) groups.set(key, []);
       groups.get(key).push(item);
     }
     return groups;
   }
   ```

4. 按字段去重，同一个键只留第一次出现的记录，下面用 has 判断避免覆盖。它不做对象深比较，字段缺失时也会落到同一个 undefined 键；缺失代表无效数据的话，就先明确校验或保留策略。

   ```js
   function uniqueBy(items, keyOf) {
     const seen = new Map();
     for (const item of items) {
       const key = keyOf(item);
       if (!seen.has(key)) seen.set(key, item);
     }
     return [...seen.values()];
   }
   ```

5. 分页先验证页码和页大小为正整数，再算 start = (page - 1) * size，返回 slice(start, start + size)。超页返回空数组，排序筛选在切片之前做。分析成本时要把输出和临时容器算进去，别因为只写了一行就觉得没有额外空间。

## 追问：这些简化实现和原生 flat、groupBy 有什么区别？

1. 原生 flat 默认只展开一层，可以传深度，并按规范处理被访问层级的空槽。上面的栈代码直接展开所有层级，碰到空槽会读成 undefined。这点和原生不一样，得说出来；要求行为一致，就要补深度和索引存在性处理。

2. 原生分组有 Object.groupBy 和 Map.groupBy，前者得到无原型对象，键按属性键处理，后者保留 Map 的键语义。教学版只展示按键收集的核心，回调索引、参数校验、迭代器异常关闭这些规范细节没有完整做。

3. 实际用原生方法前还要核对目标运行环境支不支持，当前浏览器能跑，不代表全部用户可用。题目要求手写，就按约定输入验证空数组、嵌套顺序和特殊键；要求兼容原生，就把约定放大再补实现。

## 追问：Map 去重保留最后一条时，结果顺序会怎样？

1. 对已有键再次 set 会替换值，但不会把这个键挪到末尾。所以遍历时无条件 set，得到的是最后一条记录的内容，键的排列仍跟首次出现顺序一致。「留最后一条」和「按最后出现位置排序」是两件事。

2. 比如键依次为 A、B、A，直接覆盖后顺序仍是 A、B，但 A 对应第三条记录。要按最后出现位置排，可以每次 set 前删已有键再插入，最终变成 B、A。用这个小例子先把规则对清楚。

3. 键的相等也要说清楚。Map 会把 NaN 当成同一个键，正负零也归成同一个，对象按身份分。两个内容相同的对象不会自动去重；业务通常应选稳定标识，别随意用 JSON 字符串化冒充适用于所有值的深比较。
