---
id: yunshu-followup-test-scope
title: 追问：你的测试到底覆盖了什么？构建通过、接口 200、页面能打开，能说明功能正确吗？
aliases: [能讲讲项目中的测试覆盖与构建、接口成功的证明范围吗？, 关于测试覆盖与构建、接口成功的证明范围，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, 纯函数测试, 集成测试, 执行记录]
---

# 追问：你的测试到底覆盖了什么？构建通过、接口 200、页面能打开，能说明功能正确吗？

## 核心回答

现在有三个测试文件、22 个 test 声明，主要测 Token 过期和调度、single flight、地图数据和 AQI 边界、图表聚合与元数据转换，覆盖的是纯函数输入输出。

这不能证明登录、刷新接口、权限、高德 SDK、SSE、CSV 和部署代理都正确。构建通过、接口 200 或页面能打开也都不够，我会再补模拟请求的组件测试和关键端到端流程。

【authSession.test.ts 实际测的是 authToken 工具，不是完整会话集成。这次没运行测试，只能确认文件存在，不能说 22 个测试都通过了。】

## 回答要点

- 现在有三个测试文件、22 个 test 声明，主要测 Token 过期和调度、single flight、地图数据和 AQI 边界、图表聚合与元数据转换，覆盖的是纯函数输入输出。
- 这不能证明登录、刷新接口、权限、高德 SDK、SSE、CSV 和部署代理都正确。
- authSession.test.ts 实际测的是 authToken 工具，不是完整会话集成。

## 面试官可能追问

- authSession 测工具为什么不等于测完整会话？
- 哪些关键交互应通过组件或端到端测试补齐？

## 代码证据

> **代码依据（不用于口述）**
>
> - [package.json，第 6～11 行](/Users/aaron/personal-hub/apps/project-1/package.json:6)：项目构建和测试脚本。
> - [authSession.test.ts，第 4～11 行](/Users/aaron/personal-hub/apps/project-1/tests/authSession.test.ts:4)：测试文件实际导入 authToken 工具。
> - [authSession.test.ts，第 20～96 行](/Users/aaron/personal-hub/apps/project-1/tests/authSession.test.ts:20)：8 个 Token 与 single flight 测试声明。
> - [mapData.test.ts，第 11～76 行](/Users/aaron/personal-hub/apps/project-1/tests/mapData.test.ts:11)：5 个地图数据测试声明。
> - [chartDataTransform.test.ts，第 11～192 行](/Users/aaron/personal-hub/apps/project-1/tests/chartDataTransform.test.ts:11)：9 个图表转换测试声明。
