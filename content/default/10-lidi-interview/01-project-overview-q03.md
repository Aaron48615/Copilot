---
id: lidi-202609-project-overview-q03
title: 项目中最难的地方是什么？
aliases: []
category: current-interview
difficulty: 必问
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [项目介绍, Vue3, React, Vue2, 技术栈, 项目难点]
---

# 项目中最难的地方是什么？

## 核心回答

1. 轻购里最有挑战的功能是 AI，尤其是“轻购AI”选购。它不是把模型返回的一段话直接显示出来，而是要处理推荐结果、匹配条件、未匹配条件和放宽条件，让用户知道结果的依据和边界。
2. 前端调用 `/guide/recommend` 后，拿到的是结构化的 `GuideResult`，里面有 `intent`、`recommendations`、`matched`、`unmatched` 和 `relaxedConstraints`。我需要把这些数据对应到页面，而不是自己再猜一套字段。
3. 搜索联想的难点是异步请求竞态。用户输入变化时，我先清理 300 毫秒定时器、取消旧请求，再用请求编号保证只有最后一次输入可以更新建议。
4. 购物车的难点是嵌套数据和多个状态联动。接口返回店铺、优惠分组和商品项，页面先扁平化商品，再处理勾选、全选、总价和数量修改。
5. 这些问题让我认识到，前端难点不只是把页面写出来，还要让数据、请求、页面状态和异常情况始终对应。
