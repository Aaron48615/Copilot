---
id: aaron-basic-typescript-request-state-union
title: 怎么用 TypeScript 联合类型表示请求状态？
aliases: [可辨识联合是什么，怎么用在页面状态里？, 怎么避免 loading、data 和 error 出现不合理组合？]
category: typescript
difficulty: 进阶
priority: normal
projects: []
keywords: [联合类型, 字面量, 类型收窄, 请求状态]
---

# 怎么用 TypeScript 联合类型表示请求状态？

## 核心回答

如果 loading、data、error 都分开存，有时会忘记同步它们，比如明明失败了，页面还显示加载中。这种情况下我更喜欢用一个 status 把几种情况分开，每种状态带上它需要的数据，读代码时就知道当前能拿到什么。

```ts
type Result =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string };
```

这样先判断 status 是 success，TypeScript 就知道这个分支里有 data；失败时才去读 message。它能帮我少写一些不合理的组合，但页面如果需要边刷新边展示旧数据，也要把这种情况设计进去。类型能提醒我分支有没有写对，请求乱序这些运行时问题还得另外处理。
