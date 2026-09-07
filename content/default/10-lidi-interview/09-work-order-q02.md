---
id: lidi-202609-work-order-q02
title: SLA 超时应该在前端计算还是后端计算？
aliases: []
category: current-interview
difficulty: 项目追问
priority: high
projects: [智服工单]
keywords: [Vue2, Vuex, 工单, 状态机, SLA, 权限, ECharts]
---

# SLA 超时应该在前端计算还是后端计算？

## 核心回答

1. 前端可以根据截止时间做实时展示，比如显示“即将超时”或“已超时”。
2. 但最终是否超时不能只相信浏览器时间，因为用户可以修改本机时间，时区也可能不同。
3. 后端应该保存统一的时间和业务判断结果，前端接收标准时间后负责展示。
4. 如果需要页面实时更新，可以用定时器刷新显示，但组件离开时要清理定时器，避免后台页面继续运行。

