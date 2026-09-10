---
id: aaron-basic-javascript-abort-fetch
title: AbortController 取消 fetch 后 Promise 会怎样？
aliases: [fetch 请求怎么取消？, 取消请求以后还需要处理错误吗？]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [AbortController, fetch, AbortError, 请求取消]
---

# AbortController 取消 fetch 后 Promise 会怎样？

## 核心回答

发 fetch 前先创建 AbortController，把它的 signal 传给请求，需要取消时调用 abort。比如页面离开了，或者搜索词变了，旧请求已经没有继续等的必要，就可以取消。

如果请求还没完成，默认取消一般会让 Promise 拒绝，收到 AbortError，所以 catch 里要把主动取消和真正的网络错误分开。我更喜欢把正常切页面的取消安静处理掉，不然用户只是离开页面，也会看到一个莫名其妙的失败提示。如果已经拿到 Response，就不会把已经成功的 Promise 再改成失败，不过还在读取的响应体可能会受影响。

这里还有个容易误解的地方：客户端取消等待，不等于服务器一定没处理。搜索可以再配一个请求编号，避免旧结果覆盖新结果；像提交操作，就不能因为取消了等待，直接认定服务端什么都没做。
