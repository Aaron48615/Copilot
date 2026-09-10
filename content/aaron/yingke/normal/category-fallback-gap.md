---
id: yingke-normal-category-fallback-gap
title: 不足二：首页没有完成单分类失败降级
aliases: [能讲讲项目中的首页分类失败降级的不足吗？, 关于首页分类失败降级的不足，能结合当前项目解释一下吗？]
category: yingke
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [不足, allSettled, 分类错误, 重试]
---

# 不足二：首页没有完成单分类失败降级

## 核心回答

首页虽然用了 allSettled，但没有判断 status，失败项没 value，组件继续读取就可能报错。

我会在首页把每个分类整理成 data、loading、error，成功的传数据，失败的单独显示提示和重试按钮，让其他分类继续展示。现在分别收到了结果，后面的失败处理还没完成。

## 回答要点

- 首页虽然用了 allSettled，但没有判断 status，失败项没 value，组件继续读取就可能报错。
- 我会在首页把每个分类整理成 data、loading、error，成功的传数据，失败的单独显示提示和重试按钮，让其他分类继续展示。

## 面试官可能追问

- 失败分类的 data 与 error 应怎样组织？
- 重试单分类时是否必须重新请求全部分类？

## 代码证据

> **代码依据（不用于口述）**
>
> - [pages/home/index.vue 第 42～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:42>)：直接保存三项 settlement 结果，没有检查 `status`。
> - [components/listContent.vue 第 4～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:4>)：组件只支持存在 `value` 的成功结果。
