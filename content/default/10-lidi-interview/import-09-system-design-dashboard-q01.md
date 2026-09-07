---
id: lidi-202609-import-09-system-design-dashboard-q01
title: 配置错误怎么处理？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [dashboard, 图表, 聚合, 刷新]
---

# 配置错误怎么处理？

## 核心回答

编辑器在保存前做字段级校验，服务端再次校验并拒绝未知字段、危险查询和过大的范围。预览失败时显示具体哪张卡、哪个字段不合法，保留用户输入，不能只弹一个“系统错误”。版本化配置后，旧图表仍能按旧 schema 读取或给出迁移提示。

