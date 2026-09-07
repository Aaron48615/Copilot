---
id: lidi-202609-import-02-javascript-error-handling
title: 前端异步错误应该怎么分层处理？
aliases: [Promise 错误处理, 全局异常, 错误边界]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [错误处理, Promise, try catch, 兜底]
---

# 前端异步错误应该怎么分层处理？

## 核心回答

我会先区分三种错误：用户输入不合法、业务规则不允许、系统或网络失败。输入错误在表单旁边提示，业务错误展示服务端给出的可理解信息，网络或系统错误记录上下文并给用户一个可重试的入口。所有错误都在最靠近能做决定的地方处理，不能在每一层 catch 后只弹一句“失败了”。

请求层负责统一解析状态码、超时和取消；页面负责决定空态、重试还是跳登录；全局监控负责收集没有被页面处理的异常。这样既不会把所有逻辑塞进组件，也不会把有用的错误信息吞掉。
