---
id: aaron-basic-react-key-virtual-real-dom
title: key 的作用、虚拟 DOM 和真实 DOM 的区别
aliases: [请讲讲：key 的作用、虚拟 DOM 和真实 DOM 的区别, 关于“key 的作用、虚拟 DOM 和真实 DOM 的区别”，你会怎样回答？]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [key, 虚拟DOM, 真实DOM, Diff]
---

# key 的作用、虚拟 DOM 和真实 DOM 的区别

## 核心回答

虚拟 DOM 是用 JavaScript 对象描述界面结构，比如元素类型、属性和子节点，它自己不是浏览器里的真实节点。状态变化后，React 重新计算界面描述，再和之前的结构协调比较，把需要的变化提交到真实 DOM，浏览器才继续布局和绘制。

比较时主要在同一层级看节点，类型不同通常会替换；同类型尽量复用，列表则用 key 区分身份。稳定的 key 可以让插入、删除或排序之后的节点和组件状态仍然对应正确，所以动态列表一般用数据 ID，而不是每次随机生成或直接用索引。

我觉得虚拟 DOM 的主要价值是让开发者专注描述界面，不用手动维护一大堆 DOM 更新，还能把渲染描述和具体平台操作分开。它可以减少一些不必要的 DOM 操作，但创建对象和比较也有成本，不能保证永远比精确的手写 DOM 操作快，也不保证每次都找到数学上最少的修改。

【传统树编辑距离算法常被举为 O(n³) 的比较背景，React 用同层、类型和 key 等假设简化协调，不能把复杂度写成 O(n*3)。减少无意义的结构变化、使用合理的 memo 或 shouldComponentUpdate 可以帮助减少工作，但业务需要的列表移动不应该为了迎合算法而禁止。】
