---
id: lidi-202609-import-03-frameworks-react-lifecycle
title: React 生命周期说说看？哪些被废弃了？
aliases: [react生命周期, 生命周期, getDerivedStateFromProps, 废弃生命周期]
category: current-interview
difficulty: 高频
priority: high
projects: []
keywords: [生命周期, componentDidMount, getDerivedStateFromProps, UNSAFE]
---

# React 生命周期说说看？哪些被废弃了？

## 核心回答

1. 类组件可以按挂载、更新和卸载理解。挂载时初始化状态并执行 render，DOM 提交后执行 componentDidMount；需要建立订阅或操作已挂载节点，通常在提交后的生命周期处理，而不是放在构造或 render 中。

2. 更新阶段可能涉及 getDerivedStateFromProps、shouldComponentUpdate、render，以及提交前的 getSnapshotBeforeUpdate 和提交后的 componentDidUpdate。不是每次更新都需要实现所有方法，componentDidUpdate 内修改 state 尤其要有条件，否则容易反复更新。

3. componentWillUnmount 负责释放监听、定时器等资源。老的 componentWillMount、componentWillReceiveProps、componentWillUpdate 被列为不安全的旧式生命周期，带 UNSAFE_ 前缀的形式仍可能在老代码中出现，不宜继续作为新代码的常规选择。

4. 原因是渲染阶段可能重复执行或被放弃，在这些阶段混入请求和外部修改不可靠。函数组件则用 Effect 表达同步和清理，但不能逐个机械对应生命周期；我会按依赖和业务行为重组，派生值也不必为了对应某个生命周期再存一份状态。

5. 比如滚动列表更新前要记住当前位置，可以在提交前读取必要的旧布局信息，再在更新后按新布局恢复，这正体现了快照和提交后处理的区别。普通条件判断则优先依据数据完成，不能因为生命周期提供了很多方法，就把一个简单功能拆到所有方法里，增加前后依赖。

## 追问：componentDidUpdate 里发请求怎样避免无限循环？

1. 我会比较真正影响请求的输入，例如 prevProps.userId 与当前 userId。只有编号改变才重新获取详情，不能因为任意 state 更新都请求；请求结果 setState 又会导致更新，无条件执行就可能形成循环。

2. 比较还应覆盖完整查询条件，而不是只检查一个碰巧变化的字段。例如筛选条件与页码都决定列表时，要明确两者共同决定请求，并在筛选变化时按业务规则重置页码，避免拿到错误页的数据。

3. 另外需要处理请求竞态和卸载后的结果，条件判断只能减少重复发起，不能保证旧响应不回写。测试应包含快速切换编号、请求失败和离开页面，不能只确认正常情况下能看到一次接口结果。

## 追问：getDerivedStateFromProps 适合把所有 props 同步到 state 吗？

1. 不适合，它容易制造两份需要同步的数据。比如输入草稿既受父组件 props 控制，又在子组件内编辑，父级无关更新时若重新复制，就可能覆盖用户输入，甚至让字段看起来无法修改。

2. 纯派生数据直接计算，完全由父级管理的值保持受控，切换不同对象时可以明确重置。只有确实需要根据 props 变化调整内部状态的少量场景，才考虑这个方法，并保存足够信息判断何时变化。

3. 这个方法属于渲染相关逻辑，应保持纯粹，不能在里面请求或操作 DOM。我会先解释为什么其他更直接的数据流方案不合适，再使用它，不能把它当成旧 componentWillReceiveProps 的通用替换。
