---
id: lidi-202609-import-03-frameworks-vue-testing
title: Vue 组件和异步交互测试怎么写？
aliases: [Vue Test Utils, Vue 测试, 组件交互测试]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [Vue Test Utils, E2E, 异步, 交互]
---

# Vue 组件和异步交互测试怎么写？

## 核心回答

组件测试从用户动作开始：填表单、切换客户、点击提交，然后等待页面上的 loading、错误或成功结果。接口用 mock 控制成功、空数据、失败和慢响应，断言组件是否禁用按钮、保留输入和清理旧结果；不要直接断言某个 data 字段。跨页面权限、登录和关键业务链路再交给 E2E，通过可见文本、role 和 label 定位。

