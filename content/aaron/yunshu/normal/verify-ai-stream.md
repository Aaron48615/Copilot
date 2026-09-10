---
id: yunshu-normal-verify-ai-stream
title: AI 流式回答和降级
aliases: [能讲讲项目中的AI 流式回答和降级的验证吗？, 关于AI 流式回答和降级的验证，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [SSE, 断流, AI Key]
---

# AI 流式回答和降级

## 核心回答

AI 会试不填 Key、正确 Key、错误 Key、中途断流和请求返回 401。解析会把一条 JSON 拆成多块、把多条事件合成一块，再试尾部没换行，看有没有丢内容。

【不填 Key 只能从前端确认没发 X-AI-KEY，后端是否走规则回答还要看接口或实现。错误 Key 应给清楚提示，HTTP 成功不等于回答成功。目前没有流解析测试，这次也没人工验证，降级和后端行为还不能说已经确认。】

## 回答要点

- AI 会试不填 Key、正确 Key、错误 Key、中途断流和请求返回 401。
- 不填 Key 只能从前端确认没发 X-AI-KEY，后端是否走规则回答还要看接口或实现。

## 面试官可能追问

- 尾部没有换行时怎样检查是否漏消息？
- 不发送 Key 头能否证明后端确实走规则回答？

## 代码证据

> **代码依据（不用于口述）**
>
> - [AI.tsx，第 36～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：有 Key 和无 Key 的前端配置状态。
> - [AI.tsx，第 149～184 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：按配置添加请求头，并处理 401。
> - [AI.tsx，第 186～216 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：数据块缓冲和事件解析路径。
> - [AI.tsx，第 128～136 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:128)：流式请求异常时的前端失败文案。
