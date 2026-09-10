---
id: aaron-basic-vue-vue-react
title: Vue 和 React 有什么区别
aliases: [请讲讲：Vue 和 React 有什么区别, 关于“Vue 和 React 有什么区别”，你会怎样回答？]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [Vue, React, 响应式, JSX]
---

# Vue 和 React 有什么区别

## 核心回答

Vue 和 React 都是组件化、声明式地开发界面，父组件都可以通过 props 给子组件传数据，常见渲染方式也都用到了虚拟 DOM。使用它们之后，我主要描述状态对应什么界面，具体 DOM 更新交给框架处理。

区别上，Vue 常用模板和指令，比如 v-if、v-for、v-model；React 常用 JSX，把条件、循环和事件逻辑写在 JavaScript 里。Vue 通过响应式系统跟踪数据依赖，Vue 2 主要用 Object.defineProperty，Vue 3 用 Proxy；React 通常通过 state 更新触发重新渲染，再协调需要更新的部分。

表单里 Vue 的 v-model 把值绑定和事件更新合在一起，React 的受控表单一般显式写 value 和 onChange。通信上，Vue 子向父通常 emit 事件，React 通常调用父组件传入的回调；两者都有跨层级共享和状态管理方案。

我觉得选择时除了写法习惯，还要看项目已有代码和团队使用的生态，不能简单认为一个一定比另一个快。Vue 的双向表单绑定也不代表子组件可以随意修改父组件传来的 props。
