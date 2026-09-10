---
id: aaron-basic-react-event-dom-flow
title: React 事件机制和原生 DOM 事件流的区别
aliases: [请讲讲：React 事件机制和原生 DOM 事件流的区别, 关于“React 事件机制和原生 DOM 事件流的区别”，你会怎样回答？]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [合成事件, DOM事件流, 事件委托]
---

# React 事件机制和原生 DOM 事件流的区别

## 核心回答

React 的合成事件是在原生事件基础上提供的一层统一接口，比如 onClick 里拿到的事件对象也有 target、currentTarget、preventDefault 和 stopPropagation，需要时可以通过 nativeEvent 访问原生事件。

很多事件会通过委托统一处理，React 17 起大多数委托监听挂在根容器上，而更早版本主要挂在 document。事件仍然和原生捕获、目标、冒泡过程相关，但并不是每种事件都统一冒泡到 document，也不能只凭“原生”或“React”就断言谁一定先执行，要看节点位置、阶段和监听注册情况。

日常我会先用 React 的事件写法，只有第三方库或特殊交互需要时才混用原生监听，并且在卸载时清理。阻止默认行为用 preventDefault，阻止继续传播用 stopPropagation，React 事件回调里 return false 不能代替这两个方法。

【React DOM 从 17 起不再沿用旧式事件池，一般不需要为了异步读取而调用 persist。onScroll、focus 等具体事件的处理有特殊规则，不能拿一个点击例子推广到所有事件。】
