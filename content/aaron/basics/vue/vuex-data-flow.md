---
id: aaron-basic-vue-vuex-data-flow
title: Vuex 是什么，数据怎么流转
aliases: [请讲讲：Vuex 是什么，数据怎么流转, 关于“Vuex 是什么，数据怎么流转”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [Vuex, state, mutations, actions]
---

# Vuex 是什么，数据怎么流转

## 核心回答

Vuex 是把多个组件共享的状态集中放到 store 里管理。state 保存数据，getters 从状态推导结果，mutations 同步修改状态，actions 组织业务流程，可以执行异步请求，也可以只是同步逻辑；modules 用来按业务拆开管理。

一个常见流程是组件 dispatch 一个 action，action 请求接口后 commit 一个 mutation，mutation 更新 state，读取这些状态的组件再更新。组件也能直接 commit，不是每次修改都必须绕一遍 action。

这样做的好处是共享状态的修改路径比较清楚，不用多层传来传去。我会把真正跨组件共享的数据放进去，输入框临时内容这类局部状态还是留在组件里。

【mapState、mapGetters、mapActions、mapMutations 是帮助映射到组件的工具；Vuex 不会自动持久化，刷新后恢复状态需要额外方案。mutation 同步是为了让状态变化更容易跟踪，不能把 action 理解成“把 mutation 变成异步”。】
