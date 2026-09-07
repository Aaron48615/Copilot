---
id: lidi-202609-import-04-browser-network-engineering-file-upload
title: 前端文件上传怎么设计？
aliases: [文件上传, 分片上传, 断点续传]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [上传, 分片, 断点续传, File, 对象 URL]
---

# 前端文件上传怎么设计？

## 核心回答

小文件可以直接用 `FormData` 上传，界面要展示选择、校验、进度、成功和失败状态。大文件我会按固定大小切片，每片带文件哈希和序号，服务端先确认已经收到哪些分片，前端只补传缺的部分，最后再合并。类型和大小校验必须在服务端再做一遍，前端的 `accept` 只是体验提示。预览用 `URL.createObjectURL` 时，组件销毁或文件更换后要释放旧 URL。

