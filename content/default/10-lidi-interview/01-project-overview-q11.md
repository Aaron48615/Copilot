---
id: lidi-202609-home-category-session
title: 首页点击商品分组后，分类页怎么知道用户想看哪个分类？
aliases: [首页分类跳转, fromHome, sessionStorage分类]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [sessionStorage, fromHome, categoryMap, route query]
---

# 首页点击商品分组后，分类页怎么知道用户想看哪个分类？

## 核心回答

1. 首页点击商品分组时，把分组标题放到路由 query 的 `value`，同时在 sessionStorage 写入 `fromHome = '1'`，表示这次跳转确实来自首页。
2. 分类页挂载时读取 query 和这个标记，用 `categoryMap` 把“数码好物、美妆护肤、运动装备、新鲜水果”等标题映射成左侧分类下标。
3. 如果没有 `fromHome`，分类页不会根据旧的 query 自动改变选中项，避免用户普通进入分类页时被残留参数影响。
4. 读取以后马上删除 `fromHome`，这是一次性导航状态，不应该一直留在浏览器里。
5. 这个实现适合简单的页面跳转。如果分类名称以后由后端动态配置，最好直接传 categoryId，而不是依赖前端写死的中文标题和下标。

