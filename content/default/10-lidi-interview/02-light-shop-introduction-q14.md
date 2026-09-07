---
id: lidi-202609-light-shop-ai-test
title: 轻购AI功能你会怎么测试？
aliases: [AI功能测试, AI测试用例, 导购测试]
category: current-interview
difficulty: 进阶
priority: high
projects: [轻购]
keywords: [AI测试, GuideResult, 空输入, 失败, 边界]
---

# 轻购AI功能你会怎么测试？

## 核心回答

1. 先测输入边界：空字符串、只有一个字符、前后有空格、超过 200 个字符，以及包含预算、分类和多个要求的正常输入。
2. 再测接口结果：正常推荐、多条推荐、空推荐、缺少商品图片或价格、`matched` 为空、`unmatched` 有内容，以及存在 `relaxedConstraints` 的结果。
3. 测请求状态：提交以后按钮是否 loading，成功后是否展示结果，失败后是否提示，失败以后是否能再次提交，页面不会一直卡在加载状态。
4. 测跳转：点击推荐卡片和“查看商品”是否都能带正确的 `prodId`，商品详情页是否能正常加载，而不是把推荐对象整个塞进 URL。
5. 测服务异常：超时、HTTP 错误、业务 `success` 为 false、返回 JSON 结构不对，以及用户连续点击提交。当前代码有 loading 防止部分重复操作，但还可以继续加明确的请求防重和取消。
6. AI 输出不是完全固定的，所以自动化测试不应该断言某个模型一定推荐哪件商品，而应该断言结构、数量、字段和页面行为。

