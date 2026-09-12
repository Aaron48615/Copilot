---
id: aaron-basic-browser-web-worker
title: Web Worker 适合解决什么问题？
aliases: [页面计算很卡时可以用 Worker 吗？, Web Worker 和主线程怎么通信？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [WebWorker, 主线程, postMessage, 计算任务]
---

# Web Worker 适合解决什么问题？

## 核心回答

Web Worker 可以让一部分 JavaScript 在独立线程里运行。比如解析大文件、处理大量数据，如果这些计算一直占着主线程，页面点击和滚动就容易卡，可以考虑把计算交给 Worker。

页面用 postMessage 把数据发过去，Worker 算完再把结果传回来，页面负责更新显示。Worker 不能直接操作页面 DOM，传过去的数据通常也要经过结构化克隆，不是两个线程直接拿同一个普通对象随便改。

我更偏向在明确有一段耗时计算时再用 Worker，这样才知道多出来的线程到底帮了什么忙。普通网络请求本身已经是异步的，不需要为了发 fetch 特意建一个 Worker。它还有启动和传数据的成本，小任务搬过去反而可能不划算。

### JavaScript 是单线程吗

更准确的说法是：**一个页面的 JavaScript 主执行环境通常在一条主线程上按事件循环执行任务**。浏览器本身不是单线程，页面也可通过 Web Worker 使用额外执行环境。

```js
// main.js
const worker = new Worker("./worker.js", { type: "module" });

worker.postMessage({ numbers: [1, 2, 3] });
worker.onmessage = (event) => {
  console.log(event.data); // 6
};
```

```js
// worker.js
self.onmessage = (event) => {
  const total = event.data.numbers.reduce((sum, n) => sum + n, 0);
  self.postMessage(total);
};
```

Worker 不能直接操作页面 DOM，通常使用 `postMessage` 传递可结构化克隆的数据。大数组、图像处理、压缩、语法分析等 CPU 密集任务比较适合放进 Worker。
