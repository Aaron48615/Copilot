---
id: lidi-202609-address-management
title: 轻购的收货地址新增、编辑和选择是怎么做的？
aliases: [地址管理, 地址级联, 地址选择, area cascader]
category: current-interview
difficulty: 高频
priority: high
projects: [轻购]
keywords: [AddressView, addAddress, updateAddress, getAreaList, 地址级联]
---

# 轻购的收货地址新增、编辑和选择是怎么做的？

## 核心回答

1. 地址页有列表、新增和编辑三种模式。列表请求 `/p/address/list` 后，把后端字段转换成 Vant 地址列表需要的 `id`、`name`、`tel`、`address` 和 `isDefault`。
2. 新增或编辑时，用户填写姓名、手机号、详细地址，并通过地区级联选择省、市、区。级联不是一次把所有地区都拉下来，而是先请求省份，选中以后再请求下一级。
3. 保存时组装 `receiver`、`mobile`、`addr`、省市区名称和 ID。新增调用 `addAddress`，编辑调用 `updateAddress` 并带上当前地址 ID。
4. 从购物车或订单确认页进入地址页时，`route.query.from` 是 `cart` 或 `order`，页面进入选择模式。用户点某条地址后会先设为默认，再返回原页面，原页面重新读取最新默认地址。
5. 普通地址管理模式可以切换“管理”，设置默认地址；删除时会拦截当前默认地址，要求先换默认地址，避免删除以后订单没有可用地址。
6. 地址是订单关键数据，所以地址选择后不能只相信页面上旧对象，购物车和订单确认都要重新读取服务端地址列表。

