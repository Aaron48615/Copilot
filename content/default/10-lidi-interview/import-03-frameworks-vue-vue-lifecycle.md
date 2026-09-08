---
id: lidi-202609-import-03-frameworks-vue-vue-lifecycle
title: Vue 的生命周期有哪些？
aliases: [生命周期钩子, mounted, beforeUnmount, 父子生命周期顺序]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [created, mounted, beforeUnmount, setup, activated]
---

# Vue 的生命周期有哪些？

## 核心回答

1. 按创建、挂载、更新、卸载这条线记。选项式里，`created` 时响应式状态和方法已经好了，DOM 还没挂上；`mounted` 才能访问已挂上的自身节点，适合要真实容器的初始化。单纯拿数据读状态，不必等到节点出现。Vue 2 是 `beforeCreate` / `created`、`beforeMount` / `mounted`、`beforeUpdate` / `updated`、`beforeDestroy` / `destroyed`。Vue 3 把销毁那对改成 `beforeUnmount` / `unmounted`，前面几对名字一样。

2. 更新前后是 `beforeUpdate`、`updated`，组合式是 `onBeforeUpdate`、`onUpdated`。它们跟组件视图更新有关，不适合在里面无条件再改会触发自身更新的状态，容易来回跑。只关心一个字段，用 `watch` 比每次 `updated` 里扫所有数据更明确。

3. 组合式把钩子写成 `onMounted`、`onBeforeUnmount` 这些函数，放在 `setup` 里。`beforeCreate`、`created` 没有对应 Hook，`setup` 本身比它们还早。监听、定时器、第三方实例按责任释放。框架停掉组件自己的响应式执行，外部资源不会自动停。

4. `setup` 负责建状态、注册生命周期，别把 `beforeCreate`、`created` 机械翻译成两个 Hook。生命周期注册通常在 `setup` 里同步完成。服务端不跑 `mounted` 这类客户端钩子，也不能在服务端直接用窗口或 DOM。

5. `KeepAlive` 还有激活和停用，切走不一定卸载。异步组件和 `Suspense` 也让“父级 `mounted` 等于所有后代都完成”不成立。图表看容器可不可用，缓存页回来看激活后尺寸。钩子名字猜不了所有外部工作都结束了。

6. 父子顺序也常问。挂载时先父 `created`，再子 `created`、子 `mounted`，最后父 `mounted`。请求写在父组件，子 `mounted` 时 props 往往已经有数据。卸载反过来，先子后父。

## 追问：created 和 mounted 都能请求数据，怎么选？

1. 请求只依赖 props 或已有状态，不读 DOM，就可以在创建或 `setup` 流程里启动，不必等挂载。更早开始有时能少等一会儿。SSR 取数要用框架支持的方式，客户端请求逻辑不能原样搬到服务端。

2. 参数依赖真实容器尺寸，比如按展示区域决定拉哪些可视数据，才需要挂上后测量，或等尺寸可用再请求。等的是节点条件，不是笼统觉得 `mounted` 更适合所有异步。

3. 依赖后面还会变。详情编号一切换，只在 `mounted` 请求一次可能不够。请求跟相关字段监听对应上，失败、取消、旧结果都要处理，生命周期选择才能盖住完整交互，不只是第一次打开成功。

## 追问：父组件 mounted 后，为什么某个子组件还没准备好？

1. 父级挂载说明它自己的挂载条件满足了。异步组件代码、异步 `setup`、子组件内部请求可能还在等。钩子不是所有后代和外部任务的全局完成信号，尤其页面里有懒加载和 `Suspense`。

2. 父级要调子组件能力，让子级用明确的就绪事件或公开接口说“可用了”。等的是这个能力真正初始化完，不是固定再等一轮 `nextTick`。后者不会自动完成代码下载或编辑器异步启动。

3. 测试里把子组件初始化故意变慢，这期间关掉或切走页面，父级不该去操作空引用或过期实例。接口表达的是实际准备条件，以后换子组件内部实现，父级也不必猜还要等多久。
