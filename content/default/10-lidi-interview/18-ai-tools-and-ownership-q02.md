---
id: lidi-202609-ai-tools-and-ownership-q02
title: 使用 AI 会不会让你基础变差？
aliases: []
category: current-interview
difficulty: 简历追问
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [AI 工具, 代码理解, 验证, 测试, 安全]
---

# 使用 AI 会不会让你基础变差？

## 核心回答

1. 如果只是复制，基础确实可能变差。所以我会先自己写出页面流程和实现方向，再用 AI 做补充，而不是让它替我做所有决定。
2. 轻购的 AI 功能也要求我理解基础代码：防抖和取消请求是 JavaScript 的异步控制，`GuideResult` 是 TypeScript 的数据建模，路由跳转和商品详情是 Vue 的状态与组件交互。
3. 我会把 AI 给出的代码拆开阅读，自己复述输入、输出和边界，再运行验证。比如搜索联想如果没有请求编号，单靠 abort 仍然可能有竞态，我需要自己能看出来。
4. AI 提高的是查资料和试错速度，不是替我承担判断。最终代码是否安全、是否符合业务和是否真的解决问题，责任还是在我自己。
