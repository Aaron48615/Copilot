---
id: yunshu-normal-test-coverage-gap
title: 不足七：自动化测试覆盖仍集中在纯函数
aliases: [能讲讲项目中的纯函数测试之外的覆盖缺口吗？, 关于纯函数测试之外的覆盖缺口，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [不足, 单元测试, 组件测试, E2E]
---

# 不足七：自动化测试覆盖仍集中在纯函数

## 核心回答

目前单测主要覆盖 Token 工具、地图数据和图表转换，共 22 个 test 声明，但登录到首页、401 刷新重发、SSE 分块、地图生命周期和管理页面还缺组件或端到端测试。

我会保留纯函数测试，再模拟接口做组件测试，用 Playwright 覆盖主要流程。地图和 AI 通过可控制的封装模拟失败、乱序和分块，减少改请求层、SDK 或交互时漏掉问题。

【这次没有运行测试，只能确认文件存在，还不能说都通过。】

## 回答要点

- 目前单测主要覆盖 Token 工具、地图数据和图表转换，共 22 个 test 声明，但登录到首页、401 刷新重发、SSE 分块、地图生命周期和管理页面还缺组件或端到端测试。
- 我会保留纯函数测试，再模拟接口做组件测试，用 Playwright 覆盖主要流程。
- 这次没有运行测试，只能确认文件存在，还不能说都通过。

## 面试官可能追问

- single flight 单测为什么不能证明完整登录会话正确？
- 地图 SDK 和 AI 流在测试中怎样控制失败场景？

## 代码证据

> **代码依据（不用于口述）**
>
> - [package.json，第 6～11 行](/Users/aaron/personal-hub/apps/project-1/package.json:6)：测试脚本只运行 `tests/*.test.ts`。
> - [authSession.test.ts，第 20～96 行](/Users/aaron/personal-hub/apps/project-1/tests/authSession.test.ts:20)：8 个 Token 解析、调度和 single flight 测试。
> - [mapData.test.ts，第 11～76 行](/Users/aaron/personal-hub/apps/project-1/tests/mapData.test.ts:11)：5 个地图数据转换和 AQI 边界测试。
> - [chartDataTransform.test.ts，第 11～192 行](/Users/aaron/personal-hub/apps/project-1/tests/chartDataTransform.test.ts:11)：9 个字段转换、聚合、限制和元数据测试。
