---
id: aaron-basic-javascript-proxy-pattern
title: 代理模式是什么，怎样用 Proxy 拦截对象访问？
aliases: [代理模式怎样控制目标对象的访问？, Proxy 的 get 拦截在这个例子中什么时候触发？]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [代理模式, Proxy, get, 访问控制]
---

# 代理模式是什么，怎样用 Proxy 拦截对象访问？

## 核心回答

代理模式就是在调用方和目标对象之间加一层代理，让这层代理处理访问前后的事情。比如记录访问日志、检查访问条件，或者查一下缓存，再决定要不要访问真正的对象。

这份代码用 `new Proxy(target, handler)` 包住目标对象。执行 `proxy.method()` 时，先读取 `method` 属性，所以触发 `get`，打印访问日志；然后返回原来的方法并调用它，才打印 `Target method.`。实际是先后打印两行，不是一次输出一整句话。

我觉得这个例子最值得注意的是，`get` 拦截的是“读取属性”，不只是“调用方法”。只写 `proxy.method` 而不加括号，也会触发日志，但不会执行目标方法。文件注释提到图片懒加载和缓存，不过这段代码只实现了访问日志，没有实现那两种功能，也不能把这层前端代理当成真正的安全鉴权。

### 原始示例

```js
/**
 * 代理模式是一种通过一个代理对象控制对目标对象的访问的模式。
 * 在前端开发中，常用于实现图片懒加载、数据缓存等。
 * 代理模式可以保护目标对象，控制其访问和使用，提高代码的安全性和可读性
 */
const target = {
    method() {
      console.log("Target method.");
    }
  };
  
  const proxy = new Proxy(target, {
    get(target, prop) {
      console.log(`Called ${prop} method.`);
      return target[prop];
    }
  });
  
  // 使用示例
  proxy.method(); // "Called method method. Target method."
```
