---
id: lidi-202609-import-08-coding-event-emitter
title: 手写 EventEmitter 时要处理哪些边界？
aliases: [手写发布订阅, EventEmitter]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [EventEmitter, 发布订阅, once, unsubscribe]
---

# 手写 EventEmitter 时要处理哪些边界？

## 核心回答

1. 我会先约定同步、按注册顺序派发，每次订阅有独立记录，允许同一个函数订阅多次。on 和 once 返回单次取消函数，方便精确退订；直接使用 `Set<函数>` 会自动去重，语义不同，不能说它完整复刻了 Node.js EventEmitter。

2. 下面用 Map 管事件、Set 管订阅记录，emit 复制集合固定本轮名单。取消函数可以重复调用；once 在调用前标记并退订，还检查 fired，防止嵌套派发消费过它后，外层旧快照又调用一次。

    ```js
    function createEmitter() {
      const events = new Map();
      function add(type, fn, once) {
        if (typeof fn !== 'function') throw new TypeError('listener');
        let set = events.get(type);
        if (!set) events.set(type, set = new Set());
        let active = true;
        const item = { fn, once, fired: false, off: null };
        item.off = () => {
          if (!active) return;
          active = false;
          set.delete(item);
          if (!set.size) events.delete(type);
        };
        set.add(item);
        return item.off;
      }
      const api = {
        on: (type, fn) => add(type, fn, false),
        once: (type, fn) => add(type, fn, true),
        emit(type, ...args) {
          const snapshot = [...(events.get(type) || [])];
          for (const item of snapshot) {
            if (item.once) {
              if (item.fired) continue;
              item.fired = true;
              item.off();
            }
            item.fn.apply(api, args);
          }
          return snapshot.length > 0;
        }
      };
      return api;
    }
    ```

3. 普通监听器即使在本轮被前面的回调移除，仍会按快照执行，新增监听器则不进入外层当前快照。取消只影响后续名单；这里提供返回式退订接口，没有实现按事件名和原函数查找删除的 off 方法，需要时再定义重复订阅的删除规则。

4. 这版中同步异常会向调用者传播，并中断剩余监听器，异步回调返回的 Promise 不会被等待。它也没有 Node 的特殊 error 事件和拒绝捕获机制；如果要隔离异常继续通知，必须显式捕获并报告，不能悄悄吞掉错误。

5. 我会检查重复订阅能分别取消、回调中新增和删除监听器、once 的嵌套派发，以及无人订阅时返回 false。组件卸载还应调用取消函数，这些规则和清理责任一起明确后，代码虽短，也能解释真实使用中的主要边界。

## 追问：once 为什么要在回调执行前退订，还要加 fired 标记？

1. 若在回调返回后才退订，once 回调里再次触发同名事件，会在新一轮名单里看见自己，可能递归执行很多次。先标记再退订，让嵌套派发从集合里看不到它，即使回调同步抛错，也不会留下一个等待重试的 once。

2. 只有提前退订仍不够，因为外层 emit 已经保存了快照。假设 A 在 once B 之前执行，A 嵌套 emit 先消费 B，外层随后仍会走到快照中的 B；fired 标记使这个旧记录被跳过，确保一次订阅最多调用一次。

3. 我会让 A 只嵌套一次，记录 B 的实际调用次数来验证这个边界，避免测试自身无限递归。一次订阅消费后重新注册同一个函数，应得到新的记录和新标记，那是另一份合法订阅，不能被旧标记永久屏蔽。

## 追问：监听器是 async 函数时，emit 会等它执行完吗？

1. 这版不会，emit 只是同步调用监听器，async 函数执行到等待处就把 Promise 返回。下一个监听器随即开始，emit 结束并不代表异步业务完成，所以不能在调用 emit 后直接读取所有异步回调的最终结果。

2. 如果 async 监听器拒绝，外层同步 try/catch 也抓不到稍后的拒绝，需要监听器自己处理，或 emitter 显式收集 Promise。当前教学版没有自动收集，使用者必须承担这部分错误处理，不能默认它会触发某个 error 事件。

3. 若业务需要等待所有监听器，我会另外定义 emitAsync，并明确串行还是并行、一个失败是否继续以及返回什么结果。并行收集可结合 allSettled，串行则逐个 await；这些都会改变时序，不能在原同步 API 上不说明就替换行为。
