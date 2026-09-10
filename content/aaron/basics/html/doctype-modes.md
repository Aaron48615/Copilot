---
id: aaron-basic-html-doctype-modes
title: DOCTYPE 的作用和标准模式、混杂模式
aliases: [请讲讲：DOCTYPE 的作用和标准模式、混杂模式, 关于“DOCTYPE 的作用和标准模式、混杂模式”，你会怎样回答？]
category: html
difficulty: 基础
priority: normal
projects: []
keywords: [DOCTYPE, 标准模式, 混杂模式]
---

# DOCTYPE 的作用和标准模式、混杂模式

## 核心回答

DOCTYPE是文档类型声明，告诉浏览器以什么标准渲染页面，现代的HTML页面都会在开头添加`<!DOCTYPE html>`以防止进入混杂模式。

标准模式是让浏览器以支持的最高标准渲染页面。混杂模式是为了兼容旧页面，而采用较宽松的、向下兼容的方式渲染页面，模拟老式浏览器的行为，不同的渲染模式会影响浏览器对CSS，甚至JS脚本的解析。
