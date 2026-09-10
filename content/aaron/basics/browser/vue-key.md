---
id: aaron-basic-browser-vue-key
title: Vue 中 key 有什么作用
aliases: [请讲讲：Vue 中 key 有什么作用, 关于“Vue 中 key 有什么作用”，你会怎样回答？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [Vue, key, 节点复用]
---

# Vue 中 key 有什么作用

## 核心回答

key 是让框架识别节点身份的标记。比如列表重新排序后，框架需要知道原来那个用户的输入框移动到了哪里，而不是只把第几个位置继续当作同一个人。

所以 key 要在同一组兄弟节点里稳定且唯一，动态列表一般用数据 ID。索引在插入、删除或排序后会变化，随机数则可能让每次渲染都被当成新节点，都会影响复用和组件状态。

如果主动改变 key，框架可能会销毁旧实例、创建新实例，可以用来重置组件状态；配合 transition 也能触发进入离开效果，但这种重建应该是有意为之。
