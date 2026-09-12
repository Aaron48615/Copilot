---
id: aaron-basic-browser-http-cache
title: HTTP 强缓存和协商缓存怎么工作
aliases: [请讲讲：HTTP 强缓存和协商缓存怎么工作, 关于“HTTP 强缓存和协商缓存怎么工作”，你会怎样回答？]
category: browser
difficulty: 进阶
priority: high
projects: []
keywords: [HTTP缓存, Cache-Control, ETag, 协商缓存]
---

# HTTP 强缓存和协商缓存怎么工作

## 核心回答

浏览器拿到响应后，会根据响应头决定能不能缓存、可以直接用多久。常说的强缓存，就是缓存仍然新鲜且规则允许时，直接使用本地内容，不必重新请求服务器。常用 Cache-Control 的 max-age 表示有效时长，Expires 是绝对过期时间，同时存在时通常优先按 Cache-Control 的相关规则处理。

缓存过期或者要求重新验证时，就可能使用协商缓存。浏览器把上次的 ETag 放到 If-None-Match，或者把 Last-Modified 放到 If-Modified-Since，交给服务器判断。内容没变时返回 304，浏览器复用已有响应体；变了则返回新内容。两组验证信息都有时，If-None-Match 优先。

no-cache 不是不存，而是复用前要验证；no-store 才是不要存储这个响应。must-revalidate 主要要求过期后不能未经验证就使用旧内容，不是“只要有它每次都验证”。资源文件带内容哈希时，可以配较长缓存；HTML 入口则通常要更及时更新，避免一直引用旧文件。

【DevTools 的 memory cache、disk cache 是缓存存放或取用位置，不是另两种 HTTP 缓存策略，也不能用文件类型来绝对区分。没有显式新鲜度规则时可能使用启发式缓存。ETag 是服务端给出的验证标识，不要求一定是文件 MD5；200 也不等于不缓存。】

【请求头还可以按用途记：Accept、Accept-Language、Accept-Encoding 表示接受的内容、语言、压缩格式，Host 表示目标主机；响应中 Content-Type、Content-Encoding、Content-Length、Content-Language 描述正文，Location 常用于重定向，Content-Disposition 控制展示或附件下载，Set-Cookie 设置 Cookie，Date 表示生成时间，Server 描述服务软件。Allow 是允许方法的响应头；HTTP/1.1 的 Transfer-Encoding、Connection 涉及传输和连接管理，不能照搬到 HTTP/2。Accept-Charset、Pragma、Refresh 属于较少使用或历史场景，不是缓存判断的主线。】

### HTTP 缓存和长缓存

长缓存的关键是：**文件内容不变时 URL 不变，内容变时 URL 也改变**。因此应用文件内容 hash，而不是每次构建全局都变的 hash。

```js
// webpack.config.js
export default {
  output: {
    filename: "assets/[name].[contenthash:8].js",
    chunkFilename: "assets/[name].[contenthash:8].chunk.js",
    clean: true,
  },
};
```

服务器缓存策略示意：

```http
# 带 contenthash 的静态资源
Cache-Control: public, max-age=31536000, immutable

# HTML 入口，需要及时发现新版资源 URL
Cache-Control: no-cache
ETag: "..."
```

`no-cache` 不是“完全不存”，而是复用前需要向服务器验证。完全禁止存储通常使用 `no-store`。

#### 常见缓存发布坑

- HTML 也缓存一年，导致用户一直拿到旧的资源引用。
- 旧静态资源发布后立即删除，老 HTML 在缓存或滚动发布期间会 404。
- 不稳定的模块 ID 让未修改 chunk 的 contenthash 也变化，降低缓存命中。
