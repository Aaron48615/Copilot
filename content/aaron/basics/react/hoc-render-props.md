---
id: aaron-basic-react-hoc-render-props
title: 高阶组件 HOC 是什么，和 Render Props、Hooks 有什么区别
aliases: [请讲讲：高阶组件 HOC 是什么，和 Render Props、Hooks 有什么区别, 关于“高阶组件 HOC 是什么，和 Render Props、Hooks 有什么区别”，你会怎样回答？]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [HOC, RenderProps, Hooks, 逻辑复用]
---

# 高阶组件 HOC 是什么，和 Render Props、Hooks 有什么区别

## 核心回答

高阶组件本质是接收一个组件，再返回一个增强后的组件的函数。比如给多个页面增加统一的权限判断，外层组件先判断是否允许访问，再决定渲染原组件还是其他内容，同时把原有 props 继续传下去。

它是通过组合来复用逻辑，不应该去改原组件的内部实现。优点是功能能统一封装，原来的展示组件保持简单；但包装层多了以后，组件树和 props 的来源可能不容易看清，还要处理属性重名、静态属性以及 ref 传递。

Render Props 则是让组件接收一个渲染函数，把共享逻辑产生的数据交给这个函数。自定义 Hook 可以直接让函数组件复用逻辑，通常少一层 UI 包装。我会根据已有组件形式和复用目标选择，不会认为 HOC 已经完全没有用。

【HOC 最好在组件外创建，避免每次 render 都生成新的组件类型。新组件不会自动拥有原组件的自定义静态方法，设置 displayName 只能改善调试名称，cloneElement 也不能解决静态方法继承问题。】
