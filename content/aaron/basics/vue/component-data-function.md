---
id: aaron-basic-vue-component-data-function
title: 组件的 data 为什么写成函数，为什么避免属性和方法重名
aliases: [请讲讲：组件的 data 为什么写成函数，为什么避免属性和方法重名, 关于“组件的 data 为什么写成函数，为什么避免属性和方法重名”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [data, 组件实例, 状态隔离]
---

# 组件的 data 为什么写成函数，为什么避免属性和方法重名

## 核心回答

组件会被重复创建，所以 data 要写成返回新对象的函数，让每个实例有自己的状态。比如页面上有两个计数器，点第一个时只应该改第一个的 count；如果它们共用同一个 data 对象，就可能互相影响。

关键不是只把对象外面包一层函数，而是每次调用都真的返回新对象。如果函数还是返回外面那份共享对象，问题依然存在。

在 Options API 中，data、methods、computed、props 的内容又会通过组件实例访问，所以命名也要避免冲突。比如 data 和 methods 都叫 submit，看代码时就分不清是在读数据还是调用方法，框架也可能给出警告。

【这是可复用组件的写法。Vue 2 根实例曾允许 data 直接写对象，不要把这个历史用法推广到所有组件。】
