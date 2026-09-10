---
id: aaron-basic-browser-vue-ref-nexttick-set
title: ref、nextTick 和 $set 分别解决什么问题
aliases: [请讲讲：ref、nextTick 和 $set 分别解决什么问题, 关于“ref、nextTick 和 $set 分别解决什么问题”，你会怎样回答？]
category: browser
difficulty: 基础
priority: normal
projects: []
keywords: [ref, nextTick, $set, Vue2]
---

# ref、nextTick 和 $set 分别解决什么问题

## 核心回答

模板 ref 是拿 DOM 或组件暴露的实例能力，比如给输入框聚焦、初始化图表，Vue 2 里常通过 this.$refs 访问。挂载之前可能还拿不到，条件渲染移除后引用也会变化，不能默认它一直存在。

nextTick 是等待 Vue 当前这一轮 DOM 更新完成。比如先改变列表，再读取新的高度，就应该等更新完成后再读。它不等于等待接口结束、图片加载或整个浏览器已经完成绘制，首次 DOM 初始化通常放在 mounted 更清楚。

$set 主要解决 Vue 2 的响应式检测限制：给已经响应式的对象新增属性，可以用 this.$set(obj, key, value)；按索引修改数组也可以用 $set 或 splice，修改 length 则可以通过 splice 等方式处理。Vue 3 的 Proxy 能检测这些变化，所以不再需要 $set。

【Vue 3 的 ref() 还是创建响应式值的 API，和“模板上写 ref 来拿 DOM”有关联但不是同一句定义。script setup 组件默认不会把所有内部变量暴露给父组件，需要时用 defineExpose；Vue 2 nextTick 中的 callbacks、pending、timerFunc 是旧实现细节，不是使用时必须操作的 API。】
