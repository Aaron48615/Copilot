---
id: aaron-basic-vue-vue3-lifecycle
title: Vue 3 生命周期怎么用
aliases: [请讲讲：Vue 3 生命周期怎么用, 关于“Vue 3 生命周期怎么用”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [Vue3, 生命周期, setup, onMounted]
---

# Vue 3 生命周期怎么用

## 核心回答

Vue 3 还是按创建、挂载、更新和卸载来理解。组合式 API 里，初始化状态和注册逻辑放在 setup 或 script setup；需要在 DOM 挂载前后处理的，分别用 onBeforeMount、onMounted，更新前后用 onBeforeUpdate、onUpdated，卸载前后用 onBeforeUnmount、onUnmounted。

比如初始化图表要等 onMounted 拿到容器，定时器、外部订阅和图表实例则在卸载时清理。数据改变后立即要读新 DOM，可以等待 nextTick；onUpdated 里也不能不加判断地修改同一个渲染依赖，否则可能不断更新。

如果使用 Options API，beforeCreate、created 等仍然存在，Vue 2 的 beforeDestroy、destroyed 改名为 beforeUnmount、unmounted。setup 比这些创建钩子更早执行，没有单独的 onCreated；keep-alive 对应的还有 onActivated、onDeactivated。

【生命周期注册通常要在 setup 的同步执行阶段完成。mounted 不等于异步接口和图片全部加载完成，nextTick 也不负责等待这些外部任务。】
