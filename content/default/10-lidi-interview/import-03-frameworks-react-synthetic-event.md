---
id: lidi-202609-import-03-frameworks-react-synthetic-event
title: React 合成事件是什么？和原生 DOM 事件有什么区别？
aliases: [合成事件, react事件机制, 事件委托]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [合成事件, 事件委托, 事件冒泡, React17]
---

# React 合成事件是什么？和原生 DOM 事件有什么区别？

## 核心回答

1. React 事件处理器通常接收一个合成事件对象，它包装原生事件并提供一致的使用接口，例如 preventDefault、stopPropagation、target 和 currentTarget。需要底层事件时可以访问 nativeEvent，但不应依赖未承诺稳定的内部事件映射细节。

2. React DOM 对很多事件使用委托机制，由根容器上的监听统一分发给组件处理器。React 17 起许多委托监听从 document 转到根容器，但并非每一种事件都用完全相同的绑定方式，不能把“所有事件都在 document”当成当前结论。

3. 事件传播仍要区分捕获和冒泡，onClickCapture 对应捕获处理。preventDefault 阻止浏览器默认行为，stopPropagation 阻止传播，它们不是一回事；例如阻止链接跳转不代表外层点击回调就一定不会执行。

4. React 17 及之后的网页环境已不再使用旧式事件池，不需要为了异步读取事件而常规调用 persist。即便如此，currentTarget 这类与处理时机有关的值，以及会继续变化的输入内容，仍适合在事件中及时提取业务需要的值。

5. 混合原生 addEventListener 与 React 处理器时，要检查监听位置、阶段和实际执行顺序。例如弹窗内部阻止冒泡，可能无法撤回已经执行的外层原生捕获监听；我会用小场景验证，而不是假设两套系统总按组件树直觉运行。

## 追问：target 和 currentTarget 在嵌套按钮里有什么不同？

1. target 表示触发事件的起始目标，点击按钮里的图标时可能是图标节点；currentTarget 表示当前执行这个处理器所对应的元素，在按钮 onClick 中通常是按钮。读取按钮数据时，不能假定 target 永远是按钮本身。

2. 例如按钮上设置了 data-id，内部图标没有该属性，直接从 target 读取可能得到空值。可以使用 currentTarget，或者直接把业务编号通过回调参数传入，后者通常更少依赖 DOM 结构，以后换图标也不影响业务逻辑。

3. 异步工作需要节点或值时，应在事件执行中先保存必要信息。不要因为取消事件池就认为所有事件字段在任意时刻都表达相同含义，尤其输入值可能继续变化，当前任务要使用当时值还是最新值应明确。

## 追问：为什么 return false 不能代替阻止默认行为？

1. React 事件处理器返回 false 没有像某些旧式 DOM 写法那样自动阻止默认行为或传播。提交表单想避免浏览器整页提交，应明确调用 event.preventDefault，让代码直接表达要阻止的行为。

2. 若还需要避免父层点击响应，再根据场景调用 stopPropagation，两者分别控制默认行为和事件传播。例如卡片里的删除按钮可以阻止外层打开详情，但是否阻止按钮或表单默认行为仍要单独判断。

3. 我会尽量使用正确的语义元素和 type，例如表单中普通按钮指定 type="button"。减少不必要的默认行为冲突，比在每个回调里随意阻断所有事件更容易维护，也更有利于键盘操作和无障碍使用。
