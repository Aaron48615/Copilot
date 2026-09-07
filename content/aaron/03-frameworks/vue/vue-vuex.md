---
id: vue-vuex
title: Vuex 的核心概念和工作流程是什么？
aliases: [vuex, state mutation action, 状态管理流程]
category: vue
difficulty: 高频
priority: high
projects: []
keywords: [state, getter, mutation, action, commit, dispatch]
---

# Vuex 的核心概念和工作流程是什么？

## 核心回答

Vuex 用集中式 store 保存共享状态。state 放数据，getter 计算派生值，mutation 同步修改状态，action 处理请求等异步逻辑，再提交 mutation。

组件可以通过 mapState、mapGetters、mapActions 等辅助函数访问 store。数据流集中以后，能更容易追踪是谁改了状态，但也不需要把所有页面临时状态都搬进去。

## 追问：action 和 mutation 为什么分开？

mutation 保持同步，可以让一次状态变化对应一个明确的记录。异步任务什么时候完成不确定，放在 action 里处理，成功或失败后再提交相应 mutation，状态变化会更容易追踪。
