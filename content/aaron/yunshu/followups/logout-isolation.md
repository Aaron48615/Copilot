---
id: yunshu-followup-logout-isolation
title: 追问：退出登录清掉了什么？另一个标签页和 AI Key 会一起清掉吗？
aliases: [能讲讲项目中的退出登录对多标签页和 AI Key 的影响吗？, 关于退出登录对多标签页和 AI Key 的影响，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [追问, redux-persist, AI Key, 跨标签页]
---

# 追问：退出登录清掉了什么？另一个标签页和 AI Key 会一起清掉吗？

## 核心回答

退出会把 Redux 的 Token 和用户信息清空，再由 redux-persist 保存。AI Key 用另一个 localStorage 键，退出没有清理，也没按用户隔离，换账号还可能读到原来的 Key。

其他标签页也不保证立即退出，因为没有监听 storage 或用 BroadcastChannel 通知。后面我会按产品规则清理或隔离 AI 配置、同步会话变化，并取消进行中的请求。

【后端是否撤销旧 Token 需要另外支持，前端清空不代表复制出去的 Token 也失效了。】

## 回答要点

- 退出会把 Redux 的 Token 和用户信息清空，再由 redux-persist 保存。
- 其他标签页也不保证立即退出，因为没有监听 storage 或用 BroadcastChannel 通知。
- 后端是否撤销旧 Token 需要另外支持，前端清空不代表复制出去的 Token 也失效了。

## 面试官可能追问

- 怎样让其他标签页及时感知退出？
- 退出后复制到外部的 Token 是否一定失效？

## 代码证据

> **代码依据（不用于口述）**
>
> - [authSlice.tsx，第 23～26 行](/Users/aaron/personal-hub/apps/project-1/src/store/slice/authSlice.tsx:23)：退出只清空 Token 和用户。
> - [Layout.tsx，第 161～164 行](/Users/aaron/personal-hub/apps/project-1/src/layout/Layout.tsx:161)：布局中的退出入口只派发 logout。
> - [AI.tsx，第 36～43 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：AI 配置使用独立 localStorage 键读取。
