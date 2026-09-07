---
id: lidi-202609-import-04-browser-network-engineering-file-upload-q02
title: 怎么防止上传恶意文件？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [上传, 分片, 断点续传, File, 对象 URL]
---

# 怎么防止上传恶意文件？

## 核心回答

文件名、扩展名和 MIME 都不可信，服务端要检查文件头、大小、压缩包展开风险和用户权限，并把文件放在不可执行的存储位置。下载时设置正确的 `Content-Disposition` 和响应头，图片或富文本还需要单独清洗，不能因为扩展名看起来正常就直接内嵌。

