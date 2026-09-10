---
id: shiguang-followup-rich-text-xss
title: 追问：商品详情用了 v-html，会有 XSS 吗？调整图片尺寸算不算过滤？
aliases: [能讲讲项目中的v-html 与图片格式处理的安全边界吗？, 关于v-html 与图片格式处理的安全边界，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [追问, v-html, XSS, HTML 清洗]
---

# 追问：商品详情用了 v-html，会有 XSS 吗？调整图片尺寸算不算过滤？

## 核心回答

有风险。`v-html` 会把接口字符串当 HTML 插进去，不像普通文本插值那样自动转义。现在 `formatHtml` 只是调整图片和表格样式，另一个函数只是替换图片域名，都没有清洗危险内容。

我会先确认商品介绍的来源和编辑权限，让服务端按允许的标签、属性和链接协议清洗，前端再用成熟清洗库和 CSP 补充保护。

【危险标签、事件属性和不安全链接都可能造成 XSS，连带影响本地 Token。只删 `<script>` 或替换几个字符串不够；目前能确认缺少前端清洗，不能说线上已经发生过攻击。】

## 回答要点

- 有风险。`v-html` 会把接口字符串当 HTML 插进去，不像普通文本插值那样自动转义。
- 我会先确认商品介绍的来源和编辑权限，让服务端按允许的标签、属性和链接协议清洗，前端再用成熟清洗库和 CSP 补充保护。
- 危险标签、事件属性和不安全链接都可能造成 XSS，连带影响本地 Token。

## 面试官可能追问

- 危险事件属性为什么不能靠调整图片尺寸解决？
- 商品介绍来源不同会怎样影响清洗策略？

## 代码证据

> **代码依据（不用于口述）**
> - [商品详情第 158～162 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:158)：富文本通过 v-html 渲染。
> - [utils.js 第 1～17 行](/Users/aaron/personal-hub/apps/project-2/src/utils/utils.js:1)：只处理图片和表格尺寸。
> - [shopImages.ts 第 3～19 行](/Users/aaron/personal-hub/apps/project-2/src/utils/shopImages.ts:3)：只递归改写图片域名。
> - 原理参考：[Vue 安全指南](https://vuejs.org/guide/best-practices/security.html)。
