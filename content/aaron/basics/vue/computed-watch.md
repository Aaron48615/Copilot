---
id: aaron-basic-vue-computed-watch
title: computed 和 watch 怎么选，deep 和 immediate 有什么作用
aliases: [请讲讲：computed 和 watch 怎么选，deep 和 immediate 有什么作用, 关于“computed 和 watch 怎么选，deep 和 immediate 有什么作用”，你会怎样回答？]
category: vue
difficulty: 基础
priority: high
projects: []
keywords: [computed, watch, deep, immediate]
---

# computed 和 watch 怎么选，deep 和 immediate 有什么作用

## 核心回答

computed 适合“根据已有数据算一个结果”，比如购物车总价、筛选后的列表。它会跟踪依赖并缓存结果，依赖没变时再次读取不用重新算；所以不是只有复杂计算才能用，主要看这个值是不是从其他状态推导出来的。

watch 适合“某个数据变化后做一件事”，比如搜索词改变后请求接口，或者把设置同步到本地存储。它默认不会刚注册就执行回调，设置 immediate: true 可以先执行一次；监听对象内部变化时，可以配置 deep: true，也可以直接监听需要的具体属性。

我会尽量让 computed 保持纯计算，把请求、写存储这些副作用放到 watch 或事件处理中。watch 不是每次页面渲染都会执行，还是要看监听源有没有发生符合条件的变化。

【深度监听需要遍历嵌套数据，范围太大会有额外开销。对象原地修改时，深度回调的新旧值可能指向同一个对象，不会自动给一份修改前的深拷贝；发异步请求还要处理旧结果覆盖新结果的问题。】
