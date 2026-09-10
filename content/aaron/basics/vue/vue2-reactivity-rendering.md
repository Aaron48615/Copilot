---
id: aaron-basic-vue-vue2-reactivity-rendering
title: Vue 2 响应式和渲染流程，为什么新增属性不更新
aliases: [请讲讲：Vue 2 响应式和渲染流程，为什么新增属性不更新, 关于“Vue 2 响应式和渲染流程，为什么新增属性不更新”，你会怎样回答？]
category: vue
difficulty: 进阶
priority: high
projects: []
keywords: [Vue2, 响应式, Object.defineProperty, Watcher]
---

# Vue 2 响应式和渲染流程，为什么新增属性不更新

## 核心回答

Vue 2 会在初始化时遍历数据，用 Object.defineProperty 给已有属性加上 getter 和 setter。组件渲染时读取哪些数据，就收集对应依赖；之后 setter 检测到变化，再通知相关 Watcher，把更新放进队列，重新渲染并更新 DOM。所以数据赋值是立即发生的，DOM 更新通常是异步批量完成的。

从页面进入的流程看，先 new Vue 初始化，再挂载；如果需要运行时编译模板，就生成 render 函数，预编译的单文件组件已经有对应渲染函数。render 生成虚拟节点，首次挂载创建真实 DOM，后续更新再比较新旧虚拟节点，把差异应用到页面。

新增属性不更新，就是因为初始化时没有给这个属性加访问拦截。常用办法是提前声明，或者对已经响应式的嵌套对象使用 this.$set(obj, 'name', value)。也可以把绑定的对象整体替换成包含新属性的新对象。Vue 2 直接按数组索引赋值、修改 length 也有检测限制，可以用 $set 或 splice。

【$set 不是给 Vue 实例动态补任意根级响应式字段的万能方法。Object.assign 如果只是给旧对象增加属性，仍然有同样的限制，要考虑生成新对象后替换原绑定。Vue 3 的 Proxy 可以拦截对象增删属性和数组变化，不再需要沿用这些 Vue 2 补救方式。】
