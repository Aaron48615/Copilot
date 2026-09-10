---
id: aaron-basic-vue-vue3-reactivity-ref-reactive
title: Vue 3 响应式怎么实现，ref 和 reactive 有什么区别
aliases: [请讲讲：Vue 3 响应式怎么实现，ref 和 reactive 有什么区别, 关于“Vue 3 响应式怎么实现，ref 和 reactive 有什么区别”，你会怎样回答？]
category: vue
difficulty: 进阶
priority: high
projects: []
keywords: [Vue3, 响应式, ref, reactive, Proxy]
---

# Vue 3 响应式怎么实现，ref 和 reactive 有什么区别

## 核心回答

Vue 3 的 reactive 会返回原对象的 Proxy。渲染或副作用函数读取属性时，在 get 拦截里记录这个数据被谁使用；修改时在 set 等拦截里找到相关依赖，安排它们重新执行。Reflect 用来完成对应的底层属性操作，读取访问器时也能保持合适的 receiver。

Proxy 本身不是自动深层代理的，Vue 会在读取到嵌套对象时继续把它转成响应式对象，所以能处理深层变化。组件更新还会经过调度和去重，不是一次赋值就同步把整个页面重新画一遍。

使用上，ref 可以包基本值，也可以包对象，在 JavaScript 里通常用 .value 读写；reactive 用于对象、数组、Map、Set 这类可代理的数据，直接访问属性。ref 自己通过 .value 的 getter、setter 跟踪变化，包的是对象时，再把内部对象转成响应式，所以不能说 ref 的任何情况都只是 reactive 的外壳。

如果数据经常整份替换，比如接口返回的列表，我会考虑 ref；如果是一起维护多个字段的对象，reactive 也很直观。reactive 的基本值属性直接解构出来，可能脱离原来的响应式联系，需要时用 toRef 或 toRefs。

【要通过响应式代理修改数据，直接改原始对象不会触发同样的拦截。模板中 ref 的自动解包有适用范围，响应式数组、Map 等容器里的 ref 也不能一概省掉 .value。】
