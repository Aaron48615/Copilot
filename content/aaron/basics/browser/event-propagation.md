---
id: aaron-basic-browser-event-propagation
title: 事件捕获、冒泡和委托是什么，怎么阻止
aliases: [请讲讲：事件捕获、冒泡和委托是什么，怎么阻止, 关于“事件捕获、冒泡和委托是什么，怎么阻止”，你会怎样回答？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [事件捕获, 事件冒泡, 事件委托]
---

# 事件捕获、冒泡和委托是什么，怎么阻止

## 核心回答

事件传播通常分捕获、目标和冒泡三个阶段。捕获是从外层往目标元素走，冒泡是从目标向祖先传播；addEventListener 的 capture 选项决定监听器参与哪个阶段，默认 false，常用的是冒泡阶段。

事件委托利用这个传播机制，把一类子元素的处理统一放在父元素上，通过 event.target 判断这次点到了谁。比如列表经常新增、删除项目，不用给每一项重复绑定监听；可以从 target 用 closest 找到对应条目，再确认它确实属于当前容器。currentTarget 则是当前监听器绑定的元素，和实际点击的 target 不一定一样。

stopPropagation 阻止继续传播，preventDefault 阻止可以取消的默认行为，比如链接跳转，它们互不替代。要连同同一元素后续监听器也停止，需要看 stopImmediatePropagation；在 addEventListener 回调里 return false 没有自动阻止效果。

【原生 focus、blur、load 等并不按普通 click 的方式冒泡，focus 类委托可以考虑 focusin、focusout 或捕获。passive 监听器不能用 preventDefault 阻止默认行为；不能把所有事件都强行用同一套冒泡委托方案处理。】
