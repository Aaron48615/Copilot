---
id: lidi-202609-import-04-browser-network-engineering-file-upload-q01
title: 上传过程中如何取消和重试？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [上传, 分片, 断点续传, File, 对象 URL]
---

# 上传过程中如何取消和重试？

## 核心回答

每个文件或每个分片绑定一个 AbortController，取消时停止未完成请求并把状态标记为已取消。重试只针对网络错误和明确的临时错误，采用有限次数和退避，不要把 4xx 也无脑重试。分片接口需要幂等，重复上传同一序号不会产生重复内容。

