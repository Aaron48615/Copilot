---
id: aaron-basic-react-hooks-usage
title: Hooks 解决什么问题，常用 Hooks 怎么用
aliases: [请讲讲：Hooks 解决什么问题，常用 Hooks 怎么用, 关于“Hooks 解决什么问题，常用 Hooks 怎么用”，你会怎样回答？]
category: react
difficulty: 进阶
priority: high
projects: []
keywords: [Hooks, useState, useEffect, useRef]
---

# Hooks 解决什么问题，常用 Hooks 怎么用

## 核心回答

Hooks 让函数组件也能拥有状态、使用上下文和处理副作用，不需要为了这些能力都写成 class。类组件通过实例、this.state 和 render 工作，函数组件每次渲染会重新执行函数，拿到这一次渲染的 props 和状态。还可以把相关逻辑抽成自定义 Hook，减少高阶组件或 Render Props 层层包装。

useState 管理简单状态，更新依赖旧值时可以用函数式更新；useReducer 把复杂状态变化集中到 reducer，接收 state 和 action 返回新状态。useContext 读取上层提供的共享值。useRef 则保存跨渲染的数据或 DOM 引用，修改 current 不会触发重新渲染，所以它适合存定时器 ID，不适合代替需要显示到页面的 state。

useEffect 用来和外部系统同步，比如请求、订阅和第三方实例。不写依赖数组时，每次提交后会执行；空数组表示不依赖渲染中的响应式值，正常挂载时建立一次同步；有依赖则在对应值变化后重新执行。清理函数会在下次重新执行前和卸载时运行，所以订阅和定时器要配套清理。

useMemo 缓存计算结果，useCallback 缓存函数引用，它们都根据依赖决定是否复用。需要配合子组件优化或确实有耗时计算时再加，不能把它们当成所有函数和变量的默认包装。

【普通 Hooks 要在组件或自定义 Hook 顶层调用，避免条件分支改变调用顺序。依赖比较使用 Object.is，漏依赖可能产生旧闭包；开发环境 StrictMode 可能额外执行 Effect 的建立和清理来检查问题，所以空数组不能背成“任何环境绝对只执行一次”。普通函数组件也没有可随便访问的类实例，ref 拿到什么取决于子组件暴露的能力。】
