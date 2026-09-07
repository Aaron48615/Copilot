---
id: lidi-202609-import-03-frameworks-react-stale-closure-q03
title: 请求返回顺序怎么处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [stale closure, 闭包, useRef, useEffect]
---

# 请求返回顺序怎么处理？

## 核心回答

给每次请求一个序号或使用请求控制器。只有当前序号对应的结果才能写入 state，旧请求即使没有成功取消，也只能被忽略。搜索框、切换 tab 和级联选择都需要这种保护。

