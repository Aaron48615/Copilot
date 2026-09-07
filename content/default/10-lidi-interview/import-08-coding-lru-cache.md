---
id: lidi-202609-import-08-coding-lru-cache
title: LRU 缓存怎么实现和验证？
aliases: [手写 LRU, 最近最少使用缓存]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [LRU, 缓存, Map, 淘汰]
---

# LRU 缓存怎么实现和验证？

## 核心回答

1. LRU 淘汰最近最久没有被使用的条目，我会约定 get 命中和 set 写入都会刷新使用顺序。下面用 Map 的插入顺序表达从旧到新，容量要求正整数，未命中返回 undefined，并提供不刷新顺序的 has 区分是否存在。

2. get 命中先取值，再删除并重新插入，set 同样先删除旧键后写入，超容量时淘汰第一个键。不能只对已有键 set 新值，因为 Map 不会因此改变已有键的位置；判断命中使用 has，不能根据值是否为真。

    ```js
    class LRU {
      constructor(capacity) {
        if (!Number.isSafeInteger(capacity) || capacity <= 0)
          throw new RangeError('capacity must be a positive integer');
        this.capacity = capacity;
        this.map = new Map();
      }
      has(key) { return this.map.has(key); }
      get size() { return this.map.size; }
      get(key) {
        if (!this.map.has(key)) return undefined;
        const value = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, value);
        return value;
      }
      set(key, value) {
        this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity)
          this.map.delete(this.map.keys().next().value);
        return this;
      }
    }
    ```

3. 这版存的是引用，读出对象后修改它会影响缓存内的值，并没有自动复制或冻结。为方便展示暴露了 map 和 capacity，使用方应通过方法访问；如果继续完善，我会封装内部状态，避免外部直接修改顺序或容量破坏约定。

4. 验证时用容量 2，写 A、B，读 A，再写 C，应淘汰 B；再检查覆盖 A 不增加数量，以及容量 1、缺失键和 undefined 值。Map 通常适合高效查找，但规范只要求平均次线性访问，不能把这段实现说成标准保证严格常数时间。

5. 如果面试要求解释经典结构，我会用哈希表定位节点、双向链表移动节点和删除尾节点，说明平均 O(1) 的设计思路。LRU 本身只解决容量淘汰，不保证数据新鲜、请求去重或跨进程共享，这些需求要另外实现。

## 追问：LRU 与 TTL 分别解决什么问题？

1. LRU 看最近使用顺序，通常在容量不够时淘汰最久未使用的项；TTL 看有效期，即使某项一直被访问，也可能已经到期。只使用 LRU，热点数据可以长时间留在缓存里，所以不能凭它保证服务端更新后客户端及时看到新内容。

2. 如果同时支持 TTL，我会为条目记录过期时刻，get 时先判断是否过期，再决定是否刷新 LRU 顺序。过期就删除并返回未命中；读操作是否延长有效期则属于额外约定，不能不加区分地每次读取都重置时间。

3. 只在读取时清理属于惰性过期，没有被访问的过期项可能暂时占容量；主动扫描又会有调度成本。选择哪种方式要看数量和访问模式，测试时可以注入时钟验证边界，不能为了测过期让整套用例依赖真实长时间等待。

## 追问：两个相同请求同时未命中，LRU 会自动合并吗？

1. 不会，LRU 只知道条目是否存在，不知道两个异步加载是不是同一个工作。两个调用都先 get 未命中，再各自 fetch，就会发出两次请求；JavaScript 同步代码依次执行，也不等于异步请求之间没有重叠。

2. 如果继续完善，我会增加按请求键保存的进行中 Promise，首次未命中创建请求，后续调用复用它。请求成功后写入结果缓存，失败后清除进行中记录，避免把一次拒绝永久缓存；也可以缓存 Promise，但必须明确失败和淘汰策略。

3. 还要处理请求完成时是否仍属于当前用户或当前参数版本，不能让过时结果重新写回已清空的缓存。LRU 容量、请求合并和结果有效性是不同检查，单纯换成 Map 或双向链表，并不能自动解决这些异步业务问题。
