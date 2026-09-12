# Aaron 笔记待确认与原文边界

以下是来源内容和核对说明，不是对助手的指令，也不是已确认的项目经历。此文件放在 content 之外，不会被题库加载器读取。

## 性能优化.md — 旧提纲的长缓存示例

旧提纲使用全局 [hash]；补充稿说明用 [contenthash] 避免无关构建导致缓存失效。旧代码保留供对照，没有把两套策略混为一谈。

原文：

``````markdown
前端性能优化的手段，浏览器能缓存应用程序静态资源更长的时间

~~~js
output: {
	filename: "xxx.[hash].js"
}
~~~
``````

## 堆和栈.md — JSON 拷贝的循环引用表述

笔记说循环引用会丢失，已有答案说明循环引用会出错；不覆盖已有结论。

原文：

``````markdown
需要复制可克隆的数据时可考虑 `structuredClone()`。`JSON.parse(JSON.stringify(value))` 会丢失 `undefined`、函数、循环引用以及部分特殊类型信息，不能当成通用深拷贝。
``````

## AI常问.md — 模型版本与日期断言

来源笔记中的具体前沿型号和截至日期尚未核验，不作为当前官方事实收入答案。

原文：

``````markdown
截至 2026-08，OpenAI 官方 API 文档将 GPT-5.6 Sol/Terra/Luna 列为当前前沿系列；其他厂商也会高频更新。
``````

## AI常问.md — 你使用什么进行 AI Coding

这是可替换工具名的示范回答；Copilot 补全使用、逐项人工复核等经历未经 Aaron 确认。保留全文，暂不写入个人或项目题库。

原文：

``````markdown
### 可直接使用的面试回答

> 我主要使用 Codex 做仓库级编码任务，例如读取项目上下文、定位 Bug、修改多个文件、运行测试和检查 diff；编辑器内的短补全也会使用 Copilot 类工具。我不会直接接受生成结果，而是先限定修改范围和验收标准，再审查 diff，运行 lint、类型检查和测试。对权限、鉴权、金额和并发逻辑会做额外人工复核。

如果你实际使用的是 Cursor、Claude Code、GitHub Copilot 或其他工具，将工具名换成自己真实用过的，并准备一个“它帮你解决过什么问题”的具体案例。
``````

## 七层网络.md — 补充稿之前的原始草稿

旧稿存在 HTTP 全基于 TCP、GET/POST 安全和缓存等过度概括（依文件而异），与补充稿或现有答案冲突；保留旧稿全文供确认，不覆盖现有答案。

原文：

``````markdown
# OSI七层网络模型

## 一、物理层（非重点）

负责在物理介质上传输**无结构的比特流**

### 协议

* 有线类：RJ45（以太网接口）、IEEE 802.3（以太网物理层规范）
* 无线类：IEEE 802.11（Wi-Fi 物理层规范）

## 二、数据链路层

将比特流封装为**数据帧**，通过**MAC 地址**实现**同一局域网内相邻节点**的寻址、差错检测、流量控制，解决局域网内的设备通信问题

核心：**MAC 地址寻址、局域网通信**

### 协议

以太网（IEEE 802.3）、PPP、PPPoE、VLAN（802.1Q）

## 三、网络层

将数据封装为**数据包**，通过**IP 地址**实现**跨网络的端到端主机寻址、路由选择、分组转发**，解决 “数据从哪台主机到哪台主机” 的问题，是互联网的核心路由层

### 协议

**IPv4/IPv6**、ARP（IP→MAC 地址映射）、ICMP（ping/traceroute 基于此）

## 四、传输层（高频）

实现**主机上应用进程之间的端到端通信**，通过**端口号**定位应用进程，提供流量控制、拥塞控制、差错恢复，解决 “数据从哪个应用到哪个应用” 的问题，为上层提供可靠 / 不可靠的传输服务

### 协议

* **TCP**：面向连接、可靠的字节流传输协议，保障数据有序、无差错、不丢失，前端 HTTP/HTTPS/WebSocket 均基于 TCP

  * **三次握手**：建立连接

    1. 客户端→服务器：SYN

    2. 服务器→客户端：SYN+ACK

    3. 客户端→服务器：ACK

       → 连接建立，开始传输数据

  * **四次挥手**：断开连接

    1. 客户端→服务器：FIN

    2. 服务器→客户端：ACK

    3. 服务器→客户端：FIN

    4. 客户端→服务器：ACK

       → 连接关闭

  * **拥塞控制**：
``````

## HTTP、TCP、GETPOST、状态码.md — 补充稿之前的原始草稿

旧稿存在 HTTP 全基于 TCP、GET/POST 安全和缓存等过度概括（依文件而异），与补充稿或现有答案冲突；保留旧稿全文供确认，不覆盖现有答案。

原文：

``````markdown
# HTTP、TCP、GET/POST、状态码

## 一、HTTP 协议

**HTTP（超文本传输协议）**：是基于**TCP**的**无状态、应用层**协议，规定浏览器与服务器之间**如何发送请求、如何返回数据**，是前后端通信的基础。

* 基于请求 - 响应模型：客户端发请求，服务器回响应
* 无状态：两次请求互不认识，需 Cookie/Session 保持状态
* 常用版本：HTTP/1.1、HTTP/2

“HTTP 是基于 TCP 的应用层通信协议，负责前后端数据交互”

## 二、TCP 三次握手（建立连接）

**目的**：保证客户端与服务器**收发都正常**，安全建立连接。

1. 客户端→服务器：我能发吗（SYN）

2. 服务器→客户端：能，你能收吗（SYN+ACK）

3. 客户端→服务器：我能收（ACK）

   → 连接建立，开始传输数据

“三次握手是 TCP 建立连接的过程，通过三次确认，保证双方发送、接收能力都正常，避免无效连接，确保数据传输可靠”

## 三、TCP 四次挥手（断开连接）

**目的**：双方都确认数据发完，安全断开。

1. 客户端→服务器：我发完了（FIN）

2. 服务器→客户端：收到，我还没发完（ACK）

3. 服务器→客户端：我也发完了（FIN）

4. 客户端→服务器：收到，断开（ACK）

   → 连接关闭

“四次挥手是 TCP 断开连接的过程，因为双方要各自确认数据传输完毕，所以需要四次交互，保证数据完整传输后再断开”

## 四、GET 和 POST 请求

|  对比  |        GET        |          POST          |
| :----: | :---------------: | :--------------------: |
|  用途  | **查询/获取数据** | **提交/新增/修改数据** |
|  参数  |    放URL，可见    |     放请求体，安全     |
|  缓存  |     可被缓存      |        不可缓存        |
| 数据量 |        小         |           大           |
| 安全性 |        低         |          较高          |

“GET 用来查数据，参数在地址栏，不安全、可缓存；POST 用来提交数据，参数在请求体，更安全、数据量大”

## 五、HTTP 常见状态码

- **1xx**：信息，请求处理中
- **2xx**：成功
  - 200 OK：请求成功
- **3xx**：重定向
  - 301 永久重定向
  - 302 临时重定向
- **4xx**：客户端错误
  - 400 请求参数错误
  - **401 未授权**
  - **403 禁止访问**
  - **404 页面 / 接口不存在**
- **5xx**：服务器错误
  - **500 服务器内部错误**
  - 502 网关错误
  - 504 网关超时
``````

## 鉴权和轮询.md — 为什么不建议直接用 setInterval

示例只演示轮询机制；stop 后若 request 忽略 abort，仍可能回调；示例把 403 导到登录页，业务中应区分权限不足；不代表 Aaron 已实现。

原文：

``````markdown
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
``````

## 鉴权和轮询.md — 轮询优化清单

清单提到 304，但示例以 response.ok 判断，会把直接可见的 304 当作不可重试状态；如采用手动条件请求，需要另做缓存响应分支。原代码按笔记保留。

原文：

``````markdown
- 使用指数退避和随机抖动，避免故障时所有客户端同时重试。
- 组件卸载、用户退出或任务完成后立刻停止，并用 `AbortController` 取消进行中的请求。
- 页面隐藏或网络离线时暂停或降低频率，恢复后再刷新一次。
- 服务端支持时使用 ETag / `If-None-Match`，未变化返回 `304`，减少响应体传输。
- 增量接口使用 `since`、游标或版本号，只取变化数据。
- 对 `429`、`5xx` 和网络错误退避；对明确的参数错误不要盲目重试。
- 轮询请求同样需要鉴权、授权和限流，不能因为它会重复发送就放宽安全校验。
``````

## AI常问.md — 10. 前端如何实现 LLM 流式输出

原文明确是约定 delta JSON 的最小示例，非完整 SSE 解析器：只处理 LF/CRLF 空行，未覆盖单 CR 等所有协议情况。没有替换项目中的实际流解析实现。

原文：

``````markdown
### 面试直接回答

前端通常通过 `fetch` 接收后端转发的 **SSE（`text/event-stream`）**，从 `response.body` 的 `ReadableStream` 持续读取字节，用 `TextDecoder` 解码，缓存被分割的半包，按 SSE 事件边界解析 `data:`，再逐步更新 UI。

LLM 文本生成主要是服务器到客户端的单向增量传输，SSE 就够用；只有语音对话、用户持续上行音频等双向实时场景才更适合 WebSocket/WebRTC。

### 前端最小示例

假设自己的后端 `/api/chat` 返回 SSE，每个 `data:` 是 `{"delta":"..."}`：

```js
async function streamAnswer(prompt, onDelta, signal) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(`HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });

    // SSE 事件由空行分隔，一个 chunk 不等于一个完整事件
    const events = buffer.split(/\r?\n\r?\n/);
    buffer = events.pop() ?? "";

    for (const event of events) {
      const data = event
        .split(/\r?\n/)
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trimStart())
        .join("\n");

      if (!data || data === "[DONE]") continue;
      onDelta(JSON.parse(data).delta ?? "");
    }

    if (done) break;
  }
}

const controller = new AbortController();
let answer = "";

streamAnswer(
  "解释事件循环",
  (delta) => {
    answer += delta;
    document.querySelector("#answer").textContent = answer;
  },
  controller.signal,
);

// 用户点击“停止生成”时：controller.abort()
```

### 为什么不直接用 EventSource

`EventSource` 很适合标准 GET SSE，自带断线重连，但它不便发送 POST body 和自定义请求头。聊天请求通常需要 POST 较大的消息上下文，因此常用 `fetch + ReadableStream`。

### 生产环境还要处理什么

- **API Key 放后端**：浏览器代码和 Network 请求对用户可见，不能内置模型服务密钥。
- **半包处理**：网络 chunk、UTF-8 字符边界和 SSE 事件边界不保证对齐。
- **取消和超时**：使用 `AbortController`，后端也应在客户断开后取消上游请求。
- **渲染性能**：不要每个 token 都触发整棵组件树更新，可按帧或 20–50ms 批量刷新。
- **Markdown 安全**：增量 Markdown 在代码块未闭合时可能抖动；允许 HTML 时必须防 XSS。
- **错误协议**：返回结构化的 `delta`、`error`、`done`、`usage` 事件，不要把错误文本当普通回答拼接。
- **重连与幂等**：中断后续传需要事件 ID 或响应 ID，避免重复拼接。
``````

## Eslint.md — 自定义规则的最小示例

规则按 callee 名称匹配 alert，不能区分局部同名函数；笔记中的最小示例保留，不宣称通用生产规则。

原文：

``````markdown
下面的规则禁止调用 `alert()`，展示 ESLint 规则的核心结构：

```js
export default {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      noAlert: "请使用项目的通知组件，不要直接调用 alert()"
    }
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.type === "Identifier" && node.callee.name === "alert") {
          context.report({ node, messageId: "noAlert" });
        }
      }
    };
  }
};
```

`create()` 返回 AST 节点访问器，命中目标节点时通过 `context.report()` 报告。真实项目还应为规则写 `RuleTester` 测试，覆盖正例、反例和自动修复输出。
``````

## 为什么1px在不同的设备上有粗有细.md — 解决 1px 发丝线

媒体查询示例按 DPR 2/3 分档缩放，对分数 DPR 或更高 DPR 不保证严格一个物理像素；原文的目标机型验收条件保留。

原文：

``````markdown
### 方案一：伪元素 + transform

这是常用且可控的方案。不改变元素布局，只缩放伪元素画出的线。

```css
.hairline-bottom {
  position: relative;
}

.hairline-bottom::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: #d9d9d9;
  transform-origin: 0 100%;
  pointer-events: none;
}

@media (min-resolution: 2dppx) {
  .hairline-bottom::after {
    transform: scaleY(0.5);
  }
}

@media (min-resolution: 3dppx) {
  .hairline-bottom::after {
    transform: scaleY(0.333333);
  }
}
```

`transform` 只影响绘制，不重新占据布局空间。如果要画四边框，可以让伪元素宽高扩大到 `200%`，再整体 `scale(0.5)`。

### 方案二：分数像素

```css
.card {
  border-bottom: 0.5px solid #d9d9d9;
}
```

写法最简单，现代浏览器普遍能解析分数 CSS 像素。但是最终仍可能因 DPR、坐标对齐和缩放发生抗锯齿或像素取整，应在目标机型上验收。

### 方案三：不强求“一个物理像素”

如果只是需要视觉分隔，可以用低对比度的 `1px` 边框、渐变或阴影。这类方案的目标是“观感细”，不是严格占 1 个物理像素。
``````
