---
id: shiguang-followup-route-auth
title: 追问：路由守卫判断有 Token 就放行，算完成鉴权了吗？退出登录做了什么？
aliases: [能讲讲项目中的Token 存在检查和退出登录的边界吗？, 关于Token 存在检查和退出登录的边界，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, 路由守卫, Token, 退出登录]
---

# 追问：路由守卫判断有 Token 就放行，算完成鉴权了吗？退出登录做了什么？

## 核心回答

还不算。路由守卫只检查本地有没有 Token，登录和注册可以直接进，其他页面没 Token 就跳登录。它不能判断 Token 是否过期、是否伪造，更不能决定用户能操作哪个订单，这些都要后端检查。

退出时就是删掉本地 Token，再返回登录页。目前还没统一处理 401 和 Token 刷新。

【后面我会按后端认证方式补失效处理，退出时也清掉用户相关的结算数据和缓存。前端删除 Token 不代表服务端已经撤销会话。】

## 回答要点

- 还不算。路由守卫只检查本地有没有 Token，登录和注册可以直接进，其他页面没 Token 就跳登录。
- 退出时就是删掉本地 Token，再返回登录页。
- 后面我会按后端认证方式补失效处理，退出时也清掉用户相关的结算数据和缓存。

## 面试官可能追问

- 复制出去的 Token 会因前端退出而失效吗？
- 订单权限为什么不能只交给路由守卫判断？

## 代码证据

> **代码依据（不用于口述）**
> - [路由第 72～82 行](/Users/aaron/personal-hub/apps/project-2/src/router/index.ts:72)：白名单和 Token 存在性判断。
> - [个人中心第 79～82、132～135 行](/Users/aaron/personal-hub/apps/project-2/src/views/Mine.vue:79)：退出按钮、删除 Token 和页面跳转。
> - [request.ts 第 44～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:44)：错误响应只继续抛出，没有统一处理 401。
