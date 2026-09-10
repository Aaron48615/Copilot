---
id: yunshu-normal-home-export
title: 首页数据总览、刷新和 CSV 导出
aliases: [能讲讲项目中的首页总览、定时刷新与 CSV 导出吗？, 关于首页总览、定时刷新与 CSV 导出，能结合当前项目解释一下吗？]
category: yunshu
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Promise.all, 轮询, Blob]
---

# 首页数据总览、刷新和 CSV 导出

## 核心回答

首页四组概览接口用 Promise.all 一起请求，全部返回后更新图表，事件列表则单独按页码请求，翻页就不用重查其他模块。页面可以手动刷新数据，也会每五分钟自动刷新。

CSV 导出是请求 Blob，生成临时下载地址，触发下载后再释放地址。

【首页展示城市概览、交通排行、事件分类、公共设施和事件列表。一起请求可以少一些串行等待，但现在一个概览接口失败会让整组刷新失败，也没有取消或请求编号，连续刷新时可能被旧结果覆盖。具体耗时和导出的文件内容还需要验证。】

## 回答要点

- 首页四组概览接口用 Promise.all 一起请求，全部返回后更新图表，事件列表则单独按页码请求，翻页就不用重查其他模块。
- CSV 导出是请求 Blob，生成临时下载地址，触发下载后再释放地址。
- 首页展示城市概览、交通排行、事件分类、公共设施和事件列表。

## 面试官可能追问

- 手动刷新和定时刷新重叠时结果会怎样？
- 下载到 Blob 为什么还不能直接判定导出成功？

## 代码证据

> **代码依据（不用于口述）**
>
> - [Dashboard.tsx，第 94～124 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:94)：请求 CSV Blob、创建下载链接并释放对象 URL。
> - [Dashboard.tsx，第 486～517 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：四组概览并行请求和事件分页请求。
> - [Dashboard.tsx，第 519～554 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:519)：手动刷新、首屏请求和五分钟定时刷新。
> - [Dashboard.tsx，第 565～652 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:565)：导出、刷新、响应式指标卡、图表和分页事件表入口。
> - [cities.ts，第 39～77 行](/Users/aaron/personal-hub/apps/project-1/src/api/cities.ts:39)：概览、交通、事件、设施和 CSV 导出接口。
