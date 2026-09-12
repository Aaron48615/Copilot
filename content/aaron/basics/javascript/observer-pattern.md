---
id: aaron-basic-javascript-observer-pattern
title: 观察者模式怎样注册、移除和通知观察者？
aliases: [Subject 怎样把消息通知给多个 Observer？, 观察者模式的一对多关系怎么用代码实现？]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [观察者模式, Subject, Observer, 通知]
---

# 观察者模式怎样注册、移除和通知观察者？

## 核心回答

观察者模式可以理解成，一个对象维护一组关心它的观察者，需要通知时，逐个调用观察者的方法。这份代码里的 `Subject` 就负责管理这份名单，`Observer` 负责收到通知后做什么。

`addObserver()` 把观察者放进数组，`removeObserver()` 找到它的位置后移除。`notify(data)` 遍历数组，调用每个观察者的 `update(data)`。示例注册了两个观察者，所以调用一次 `notify('Hello World!')`，会打印两次相同的接收信息。

这里的通知是手动触发的，并不是对象一发生变化就能自动检测到。原注释讲的是模式的用途，代码本身没有实现状态变化检测。

再看边界：同一个观察者可以被重复添加，移除时只删掉找到的第一项；通知时也是同步逐个调用，没有异常隔离。如果某个 `update()` 抛错，这次遍历就会中断。我觉得理解这些细节，比只记住“一对多通知”更容易把代码讲清楚。

### 原始示例

```js
/**
 * 观察者模式是一种对象间的一对多依赖关系，当一个对象状态改变时，
 * 所有依赖它的对象都会自动更新。在前端开发中，常用于实现事件监听和消息订阅等。
 * 观察者模式可以降低对象间的耦合度，提高代码的可读性和可复用性。
 */
class Subject {
    constructor() {
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    removeObserver(observer) {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }
  
    notify(data) {
      this.observers.forEach(observer => observer.update(data));
    }
  }
  
  class Observer {
    update(data) {
      console.log(`Received data: ${data}`);
    }
  }
  
  // 使用示例
  const subject = new Subject();
  const observer1 = new Observer();
  const observer2 = new Observer();
  
  subject.addObserver(observer1);
  subject.addObserver(observer2);
  console.log(subject,'subject')
  subject.notify("Hello World!");
```
