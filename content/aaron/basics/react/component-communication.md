---
id: aaron-basic-react-component-communication
title: React 组件之间怎么通信
aliases: [请讲讲：React 组件之间怎么通信, 关于“React 组件之间怎么通信”，你会怎样回答？]
category: react
difficulty: 基础
priority: normal
projects: []
keywords: [组件通信, props, Context, 状态提升]
---

# React 组件之间怎么通信

## 核心回答

父传子用 props，子传父则调用父组件通过 props 传下来的回调，把需要的数据作为参数带回去。兄弟组件可以把共享状态提升到最近的共同父组件，再分别传给它们，避免两边各存一份还要互相同步。

如果跨很多层，比如主题、当前用户，可以用 Context，由上层提供 value，下层通过 useContext 读取。业务状态更复杂、需要统一追踪修改过程时，可以考虑 Redux 或 MobX。

也可以用事件发布订阅，让一边 publish，另一边 subscribe，但要记得取消订阅，而且数据来源会更隐蔽，所以我不会为了省几个 props 就到处使用事件总线。

【Context 是数据传递机制，value 变化会影响读取它的组件，不会自动解决所有性能问题；选择哪种方式主要看共享范围和更新频率。】
