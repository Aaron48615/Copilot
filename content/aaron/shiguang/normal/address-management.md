---
id: shiguang-normal-address-management
title: 地址管理
aliases: [能讲讲项目中的收货地址和订单临时地址吗？, 关于收货地址和订单临时地址，能结合当前项目解释一下吗？]
category: shiguang
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [地区 ID, sessionStorage, 默认地址]
---

# 地址管理

## 核心回答

地址这块有新增、编辑、删除和设置默认地址。页面选出来的是省市区名称，但接口要的是地区 ID，所以保存前还要逐级查一下，把名称对应到 ID 再提交。

从确认订单页进来时，也可以只给这次订单换地址。我会把选中的 addrId 写回 sessionStorage 里的订单参数，再返回确认页重新拿地址和金额，不会因此改掉账号的默认地址。

【使用时先看这次订单有没有选过地址，没有就用默认地址，再没有就用第一条。直辖市的名称比较特殊，省和市可能同名，后端还有“市辖区”这一层，所以我单独处理了这一种匹配。】

## 回答要点

- 地址这块有新增、编辑、删除和设置默认地址。页面选出来的是省市区名称，但接口要的是地区 ID，所以保存前还要逐级查一下，把名称对应到 ID 再提交。
- 从确认订单页进来时，也可以只给这次订单换地址。
- 使用时先看这次订单有没有选过地址，没有就用默认地址，再没有就用第一条。

## 面试官可能追问

- 省市区名称不能匹配地区 ID 时应该怎么办？
- 订单临时选址为什么不直接修改默认地址？

## 代码证据

> **代码依据（不用于口述）**
> - [地址页第 168～201 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:168)：列表加载、本次订单地址和默认地址的选择顺序。
> - [地址页第 208～243 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:208)：直辖市处理、逐级地区 ID 查询和新增地址。
> - [地址页第 259～317 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:259)：编辑回填、更新地址和设置默认地址。
> - [地址页第 374～386 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:374)：订单模式下把 addrId 写回本次结算数据。
> - [确认订单第 120～158 行](/Users/aaron/personal-hub/apps/project-2/src/views/Order.vue:120)：读取当前结算参数并重新获取地址和金额。
