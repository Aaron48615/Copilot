---
id: aaron-basic-network-token-refresh
title: 轮询过程中 Token 过期怎么办？
aliases: [轮询遇到登录凭证过期怎么恢复？, 定时请求遇到 401 时怎样避免反复刷新？]
category: network
difficulty: 进阶
priority: normal
projects: []
keywords: [Token刷新, 并发收敛, 401, RefreshToken]
---

# 轮询过程中 Token 过期怎么办？

## 核心回答

只允许一个刷新请求执行，其他请求等待同一个结果；刷新成功后原请求最多重试一次，失败则停止轮询并进入登录流程。不要让每次轮询独立刷新。

### Access Token 与 Refresh Token 的流程

一种常见流程是：

1. Access Token 生命周期较短，用于访问业务接口。
2. Refresh Token 生命周期更长，只用于换取新令牌，并应受到更严格保护。
3. Access Token 过期后，客户端只发起一次刷新请求；其他失败请求等待同一个刷新结果。
4. 刷新成功后重试原请求一次，失败则清理登录态并重新登录。
5. 服务端对 Refresh Token 轮换，并检测旧令牌重放；退出登录时使会话或刷新链失效。

必须避免多个并发请求同时刷新形成“刷新风暴”，也不能在 401 后无限刷新和重试。

```js
let refreshPromise = null;

async function refreshOnce() {
  refreshPromise ??= fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  }).finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}
```

### 401 和 403 的区别

- `401 Unauthorized` 实际表示当前请求缺少有效认证凭证，通常需要登录或刷新凭证。
- `403 Forbidden` 表示服务端理解请求，但拒绝执行；常见情况是身份已确认但权限不足。

不能看到所有 403 就自动刷新 Token，否则权限不足会变成死循环。
