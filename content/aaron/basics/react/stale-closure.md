---
id: aaron-basic-react-stale-closure
title: React 回调里读到旧状态，怎么处理？
aliases: [React 的 stale closure 是什么？, 定时器里的 state 为什么一直不变？]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [旧闭包, stale-closure, useEffect, 函数式更新, useRef]
---

# React 回调里读到旧状态，怎么处理？

## 核心回答

比如在空依赖的 useEffect 里建一个定时器，回调一直用 setCount(count + 1)，它可能一直拿初始的 count 来算，这就是常说的旧闭包问题。组件虽然重新渲染了，之前保存的回调不会自己换一套变量。

如果只是接着上一次计数加一，我更喜欢 setCount(c => c + 1) 这种写法，直接说明了“根据前一个值来更新”，也不用依赖回调里记住的旧 count。如果某个参数变了就应该重新建立监听，那就把依赖写完整，同时清理上一次的监听。确实需要长期保留回调、又读取最新值时，可以考虑用 ref 保存这个值。

useCallback 也不是自动修复的方法，依赖漏了照样读旧值。另外，有些操作本来就该记住当时的数据，比如点发送时选中的收件人，不应该等请求回来后擅自换成最新选中的人。
