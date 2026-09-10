---
id: aaron-basic-vue-watch-effect-computed
title: watch、watchEffect 和 computed 怎么选择
aliases: [请讲讲：watch、watchEffect 和 computed 怎么选择, 关于“watch、watchEffect 和 computed 怎么选择”，你会怎样回答？]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [watch, watchEffect, computed, 副作用]
---

# watch、watchEffect 和 computed 怎么选择

## 核心回答

需要一个由其他状态计算出来的值，我会用 computed，比如总价；需要在状态变化后发请求或执行其他副作用，就用 watch 或 watchEffect。

watch 需要明确指定监听源，回调能拿到新旧值，默认等变化后才执行，immediate 可以让它先跑一次。watchEffect 会立即执行，并自动跟踪这次同步执行中读到的响应式数据，依赖改变后重新执行，所以写起来比较省事，但依赖范围不像 watch 那么显式。

比如只想在用户 ID 改变时重新请求，我会用 watch；如果一个副作用天然依赖好几个值，逻辑又比较简单，可以考虑 watchEffect。发请求时还要注册清理或做请求标识，避免参数已经换了，旧请求结果却最后写回来。

【watchEffect 的异步回调只自动跟踪第一个 await 之前同步读取的依赖。深度 watch 发生原地修改时，新旧值可能是同一个对象；需要读取更新后的 DOM，可以使用 flush: 'post' 或在合适位置等待 nextTick。】
