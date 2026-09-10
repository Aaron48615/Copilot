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
