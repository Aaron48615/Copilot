---
id: aaron-basic-javascript-ajax-status
title: Ajax 怎么发请求，readyState 和 HTTP 状态码有什么区别
aliases: [请讲讲：Ajax 怎么发请求，readyState 和 HTTP 状态码有什么区别, 关于“Ajax 怎么发请求，readyState 和 HTTP 状态码有什么区别”，你会怎样回答？]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [Ajax, XMLHttpRequest, readyState, HTTP状态码]
---

# Ajax 怎么发请求，readyState 和 HTTP 状态码有什么区别

## 核心回答

用原生 XMLHttpRequest 发请求，可以分四步：创建实例，用 open 设置请求方法、地址和异步方式，注册状态与错误处理，再调用 send 发送。现在经常用 Fetch 或 Axios，但它们解决的仍然是请求和响应处理的问题。

XMLHttpRequest 的 readyState 是请求进行到哪一步：0 未初始化，1 已调用 open，2 收到响应头，3 正在接收响应体，4 请求完成。到了 4 不代表业务成功，还要看 status，也就是 HTTP 状态码，再看接口自己的业务状态。

HTTP 状态码按类别分：1xx 是信息响应，2xx 是成功，3xx 是重定向或缓存验证相关，4xx 表示客户端请求相关问题，5xx 表示服务端错误。常见的 200 是成功，301 永久重定向，302 和 307 是临时重定向，307 明确保留方法和请求体；304 表示验证后资源没变，继续用本地缓存。400 是请求有问题，401 是缺少有效认证，403 是拒绝访问，404 是资源不存在，500 是服务端内部错误，503 是服务暂时不可用，比如过载或维护。

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/list', true);
xhr.onload = () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(xhr.responseText);
  } else {
    console.error('HTTP 请求失败', xhr.status);
  }
};
xhr.onerror = () => console.error('网络异常');
xhr.timeout = 5000;
xhr.ontimeout = () => console.error('请求超时');
xhr.send();
```

【onload 表示传输完成，不等于 2xx；304 已经和服务器发生过验证交互，并不是完全没有发请求。】

### HTTP 常见状态码

#### 1xx：信息响应

| 状态码 | 含义 |
| --- | --- |
| 100 Continue | 客户端可继续发送请求内容 |
| 101 Switching Protocols | 服务器同意切换协议，经典 WebSocket HTTP/1.1 握手会用 |

#### 2xx：成功

| 状态码 | 含义 |
| --- | --- |
| 200 OK | 请求成功，响应内容取决于方法 |
| 201 Created | 成功创建资源，通常配合 `Location` |
| 202 Accepted | 已接受处理，但异步任务尚未完成 |
| 204 No Content | 成功，但没有响应内容 |
| 206 Partial Content | 返回 Range 请求的部分内容 |

#### 3xx：重定向与缓存

| 状态码 | 含义 |
| --- | --- |
| 301 Moved Permanently | 资源永久迁移，历史客户端重定向时可改为 GET |
| 302 Found | 临时重定向，历史客户端可改为 GET |
| 303 See Other | 让客户端使用 GET 获取另一资源，常用于 POST 后跳转 |
| 304 Not Modified | 条件请求命中，资源未修改，复用本地缓存 |
| 307 Temporary Redirect | 临时重定向，必须保留原方法和请求内容 |
| 308 Permanent Redirect | 永久重定向，必须保留原方法和请求内容 |

#### 4xx：客户端侧问题

| 状态码 | 含义 |
| --- | --- |
| 400 Bad Request | 请求语法或格式不正确 |
| 401 Unauthorized | 实际更接近“未认证/认证失败”，常配 `WWW-Authenticate` |
| 403 Forbidden | 服务器理解请求，但拒绝授权执行 |
| 404 Not Found | 未找到资源，也可用于隐藏资源是否存在 |
| 405 Method Not Allowed | 资源存在，但不允许该 HTTP 方法 |
| 409 Conflict | 当前资源状态冲突，如版本冲突、唯一键冲突 |
| 413 Content Too Large | 请求内容超过服务器限制 |
| 415 Unsupported Media Type | `Content-Type` 不受支持 |
| 422 Unprocessable Content | 语法正确，但语义/业务校验不能处理 |
| 429 Too Many Requests | 触发限流，可配合 `Retry-After` |

#### 5xx：服务器侧问题

| 状态码 | 含义 |
| --- | --- |
| 500 Internal Server Error | 服务器内部未预期错误 |
| 501 Not Implemented | 服务器不支持完成该请求所需的功能 |
| 502 Bad Gateway | 网关/代理从上游收到无效响应 |
| 503 Service Unavailable | 服务暂时不可用，可能在过载或维护 |
| 504 Gateway Timeout | 网关/代理在规定时间内没收到上游响应 |

### 状态码高频对比

#### 401 和 403

- `401`：你是谁还没证明，或凭证无效/过期。
- `403`：服务器知道请求者的上下文，但不允许访问该资源。

#### 301/302 和 307/308

301/308 表示永久，302/307 表示临时。另一个关键是 307/308 明确要求保留原请求方法和 body；301/302 因历史兼容行为，POST 重定向后可被改为 GET。

#### 502 和 504

- `502`：上游回了，但回的响应无效。
- `504`：等上游超时，没在规定时间内收到响应。

#### 200、201 和 204

- `200`：通用成功，通常有响应内容。
- `201`：创建新资源成功。
- `204`：成功且无需返回内容，响应不应包含 message body。
