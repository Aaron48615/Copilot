---
id: aaron-basic-network-polling-control
title: 轮询怎样避免请求重叠，并在失败或离开页面时停止？
aliases: [定时轮询如何控制并发和取消？, 请求耗时超过轮询间隔怎么办？]
category: network
difficulty: 进阶
priority: high
projects: []
keywords: [轮询, setTimeout, AbortController, 指数退避]
---

# 轮询怎样避免请求重叠，并在失败或离开页面时停止？

## 核心回答

### 什么是轮询

轮询是客户端按一定间隔主动请求服务端，检查数据是否变化。它实现简单，适合状态更新较少、允许秒级延迟的任务进度或订单状态查询。

### 为什么不建议直接用 setInterval

如果一次请求耗时超过间隔，`setInterval` 会继续触发，造成请求重叠、响应乱序和服务端压力。更稳妥的做法是等本次请求结束后，再用 `setTimeout` 安排下一次。

```js
function createPoller(request, options = {}) {
  const {
    baseDelay = 2000,
    maxDelay = 30000,
    onData = () => {},
    onUnauthorized = () => {},
  } = options;

  let timerId;
  let stopped = false;
  let failures = 0;
  let controller;

  async function poll() {
    if (stopped) return;

    controller = new AbortController();

    try {
      const response = await request(controller.signal);

      if (response.status === 401 || response.status === 403) {
        stopped = true;
        onUnauthorized(response.status);
        return;
      }

      if (response.status === 429 || response.status >= 500) {
        throw new Error(`retryable status: ${response.status}`);
      }

      if (!response.ok) {
        stopped = true;
        throw new Error(`non-retryable status: ${response.status}`);
      }

      failures = 0;
      onData(await response.json());
    } catch (error) {
      if (error.name === "AbortError" || stopped) return;
      failures += 1;
      console.error(error);
    }

    const exponentialDelay = Math.min(
      maxDelay,
      baseDelay * 2 ** failures,
    );
    const jitter = Math.random() * exponentialDelay * 0.2;
    timerId = setTimeout(poll, exponentialDelay + jitter);
  }

  poll();

  return () => {
    stopped = true;
    clearTimeout(timerId);
    controller?.abort();
  };
}

const stopPolling = createPoller(
  (signal) => fetch("/api/jobs/123", {
    signal,
    credentials: "include",
  }),
  {
    onData: console.log,
    onUnauthorized: () => location.assign("/login"),
  },
);

// 组件卸载或任务结束时调用
// stopPolling();
```

示例突出的是“请求不重叠、可取消、失败退避”。真实项目还应识别 `Retry-After`，区分断网、超时和不可重试的业务错误。

### 轮询优化清单

- 使用指数退避和随机抖动，避免故障时所有客户端同时重试。
- 组件卸载、用户退出或任务完成后立刻停止，并用 `AbortController` 取消进行中的请求。
- 页面隐藏或网络离线时暂停或降低频率，恢复后再刷新一次。
- 服务端支持时使用 ETag / `If-None-Match`，未变化返回 `304`，减少响应体传输。
- 增量接口使用 `since`、游标或版本号，只取变化数据。
- 对 `429`、`5xx` 和网络错误退避；对明确的参数错误不要盲目重试。
- 轮询请求同样需要鉴权、授权和限流，不能因为它会重复发送就放宽安全校验。
