---
id: browser-url-to-page
title: 从输入 URL 到页面展示，中间发生了什么？
aliases: [输入url后发生了什么, url到页面展示, 页面加载流程]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [DNS解析, TCP连接, 渲染, 缓存]
---

# 从输入 URL 到页面展示，中间发生了什么？

## 核心回答

浏览器先解析 URL，并根据缓存策略判断能不能复用已有内容。需要网络请求时，会解析域名、建立或复用连接，再发送 HTTP 请求。HTTPS 还涉及 TLS，具体过程也取决于协议版本。

拿到 HTML 后，浏览器继续解析文档和样式，加载脚本、图片等资源，计算布局，再绘制和合成页面。脚本和资源的加载方式会影响中间的等待。

## 追问：页面很慢时，怎么判断卡在哪一步？

先看 Network 的时间分布：域名解析、连接、等待响应还是下载花得多。如果资源已经到齐，界面仍卡顿，再用 Performance 检查脚本长任务、布局和绘制。这样能先确定问题在网络还是页面执行阶段。
