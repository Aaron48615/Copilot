---
id: lidi-202609-import-02-javascript-interface-type-q02
title: 如何设计可演进的 API 类型？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, interface, type, declaration merging]
---

# 如何设计可演进的 API 类型？

## 核心回答

把成功、业务失败、鉴权失败和网络失败分成明确的联合类型，列表和分页字段统一命名。对后端未知字段不要假设一定存在，版本新增字段保持向后兼容；如果接口属于公共边界，就在运行时解析后再暴露强类型结果。
