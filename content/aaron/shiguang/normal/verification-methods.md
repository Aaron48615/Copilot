---
id: shiguang-normal-verification-methods
title: 怎么验证这些功能
aliases: [能讲讲项目中的商城功能的验证方法吗？, 关于商城功能的验证方法，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [边界测试, 请求乱序, 业务结果]
---

# 怎么验证这些功能

## 核心回答

我会先走正常流程，再试空输入、重复点击、快速切换、刷新和接口失败。除了看页面和 Console，也会在 Network 里对一下地址、方法、参数、请求头和业务返回，HTTP 200 不代表业务一定成功。

适配就换几个屏幕宽度，看看内容、固定底栏和弹层能不能对齐，有没有横向溢出。异步请求会故意调整返回顺序，AI 则分别试正常、空内容、超时和失败。新增对比功能还要检查流式内容被拆开或合在一起时能不能正确解析，停止或修改需求后，旧回答会不会再写回来。

【地址、下单、支付以及消耗模型额度的操作，要放在允许操作的测试环境里做。项目里有首页失败隔离、搜索竞态、AI 超时、代理、图片和商品对比的测试文件，也有类型检查、构建和 AI 产物扫描脚本。但有文件不等于这一轮都跑过，具体通过了哪些，要看实际执行记录。】

## 回答要点

- 我会先走正常流程，再试空输入、重复点击、快速切换、刷新和接口失败。
- 适配就换几个屏幕宽度，看看内容、固定底栏和弹层能不能对齐，有没有横向溢出。
- 地址、下单、支付以及消耗模型额度的操作，要放在允许操作的测试环境里做。

## 面试官可能追问

- 怎样构造流式内容拆块和合块的验证数据？
- 测试文件存在与本次验证通过有什么区别？

## 代码证据

> **代码依据（不用于口述）**
> - [package.json 第 6～13 行](/Users/aaron/personal-hub/apps/project-2/package.json:6)：测试、类型检查、构建和 AI 产物扫描入口。
> - [首页测试第 25～53 行](/Users/aaron/personal-hub/apps/project-2/tests/home-data.test.ts:25)：分区失败、业务错误、结构异常和正常空数据。
> - [搜索测试第 171～231 行](/Users/aaron/personal-hub/apps/project-2/tests/search-interaction.test.ts:171)：清空、卸载、同词重输和标签改词场景。
> - [AI 客户端测试第 84～117 行](/Users/aaron/personal-hub/apps/project-2/tests/ai-client.test.ts:84)：响应体读取期间超时和计时器清理。
> - [AI 代理测试第 191～245 行](/Users/aaron/personal-hub/apps/project-2/tests/ai-proxy.test.ts:191)：分钟、小时窗口和并发计数。
> - [AI 产物检查第 5～36 行](/Users/aaron/personal-hub/apps/project-2/scripts/check-ai-bundle.mjs:5)：扫描构建产物中的 AI 配置值和密钥模式。
