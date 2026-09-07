---
id: lidi-202609-import-03-frameworks-vue-testing-q02
title: 怎样测组件销毁清理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Vue Test Utils, E2E, 异步, 交互]
---

# 怎样测组件销毁清理？

## 核心回答

挂载后触发请求、定时器或事件监听，再卸载组件，断言 abort、clearInterval、removeEventListener 或 dispose 被调用。随后让原请求完成，确认不会再改已卸载组件的状态。这个测试能抓住页面切换后 toast、倒计时和地图实例还在后台工作的泄漏。

