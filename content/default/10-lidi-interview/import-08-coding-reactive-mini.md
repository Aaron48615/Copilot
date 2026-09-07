---
id: lidi-202609-import-08-coding-reactive-mini
title: 如何手写一个最小响应式系统？
aliases: [手写响应式, reactive 最小实现]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [响应式, Proxy, effect, computed]
---

# 如何手写一个最小响应式系统？

## 核心回答

1. 我会先限定为普通对象的同步响应式，支持属性读取、赋值和 effect 自动重跑。比如 effect 里读取 `state.count` 并计算两倍值，后续修改 count 就重新计算；它不是监控任意局部变量，也暂时不处理数组和集合。

2. 依赖表用 `WeakMap<对象, Map<属性, Set<effect>>>`，这样不同对象的同名属性不会混在一起。读取时把当前 effect 加入对应集合，同时在 effect 上反向记录这个集合，方便下一次运行前移除旧订阅。

3. 执行 effect 时要保存外层执行上下文，结束或抛错后都恢复；写入时先复制订阅集合，再执行其中未处于运行状态的任务。下面是核心伪代码，`deps` 是每个 effect 持有的依赖集合列表，省略的是容器初始化而不是清理规则。

    ```text
    run(e):
      若 e 正在运行则返回
      对 e.deps 中每个 dep 执行 dep.delete(e)
      清空 e.deps；保存 prev = active；active = e
      标记 e 正在运行
      try: 执行 e.fn()
      finally: active = prev；清除运行标记
    track(target, key):
      若 active 不存在则返回
      取得或创建 bucket[target][key] 对应的 dep
      若 dep 没有 active：加入 active，并把 dep 记入 active.deps
    get(target, key, receiver):
      track(target, key)；返回 Reflect.get(target, key, receiver)
    set(target, key, value, receiver):
      old = Reflect.get(target, key, receiver)
      ok = Reflect.set(target, key, value, receiver)
      若 ok 且 !Object.is(old, value)：
        遍历对应 dep 的副本，对未运行的 e 调用 run(e)
      返回 ok
    effect(fn): 创建带空 deps 的 e；run(e)；返回 e
    ```

4. 分支清理是我会重点解释的地方：`ok ? a : b` 切到 b 后，修改 a 就不该继续触发。遍历副本也很必要，因为重跑时会先删除再添加订阅，直接遍历原 Set 可能反复访问同一个 effect。

5. 这只是教学实现，赋值部分限定自有、可写的数据属性，未覆盖原型和访问器的完整语义。继续扩展时，我会分别加入代理缓存、停止订阅和调度器；computed 的缓存失效也需要独立设计，不能把这个版本说成 Vue 源码。

## 追问：为什么 effect 执行前要清理旧依赖？

1. 依赖是本次实际执行时读到的属性，不是函数源码里出现过的所有属性。假设第一次 `ok=true`，effect 订阅了 ok 和 a，第二次切到 false 后，正确依赖应变为 ok 和 b。

2. 如果一直只增加订阅，a 会留下无效关系，以后修改 a 也会执行当前分支。例如展示字段已切换成姓名，修改旧的昵称字段仍然会重新计算。结果未必立刻出错，但会多跑计算；如果 effect 还有写入或请求等副作用，就可能产生更明显的问题。

3. 我会让每个 effect 保存反向依赖，重跑前逐个删除自己，再由读取重新收集。只清空全局变量 active 不能清除这些关系；对象上的依赖集合仍然持有 effect，所以停止监听也必须执行同类清理。

## 追问：computed 怎样做到读取时计算、未变化时复用？

1. 我会给教学版 computed 保存 getter、缓存值和 dirty 标记，内部 effect 采用惰性执行。第一次读取 value 时 dirty 为真，才运行 getter 并缓存结果；没有依赖变化时，再读就直接返回缓存。比如购物车总价被模板读取两次，源数量未变就可以复用第一次的计算结果。

2. 源数据变化时，调度器先把 dirty 设为真，并通知依赖 computed.value 的外层 effect。只标脏却不通知外层订阅者，会让页面没有机会重新读取，缓存机制看似存在，界面却停在旧值。

3. getter 执行期间要切换到内部 effect，结束后恢复外层，再正确建立外层对 value 的订阅。这个思路能讲清缓存和失效，但真实框架还有版本比较、批处理等细节，不能用它推断当前库的全部执行次数。
