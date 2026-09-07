---
id: lidi-202609-import-09-system-design-search-suggestions-q01
title: 高并发下怎么保护服务端？
aliases: []
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [搜索联想, 防抖, 缓存, 竞态]
---

# 高并发下怎么保护服务端？

## 核心回答

客户端防抖和缓存只能减轻一部分压力，服务端还要限制每个用户和 IP 的频率，设置超时，并优先走索引或专门的搜索服务。热门词可以缓存，长尾词不能无限留在缓存里。超限时返回可识别错误，让前端提示稍后重试，而不是静默显示旧数据。

