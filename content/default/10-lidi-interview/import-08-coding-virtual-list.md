---
id: lidi-202609-import-08-coding-virtual-list
title: 虚拟列表的核心计算怎么写？
aliases: [手写虚拟列表, virtual list]
category: current-interview
difficulty: 进阶
priority: high
projects: []
keywords: [虚拟列表, scrollTop, overscan, 行高]
---

# 虚拟列表的核心计算怎么写？

## 核心回答

1. 我会先实现固定行高版本：数据可以很多，但 DOM 只放视口附近的一段。滚动容器有明确高度，内部占位层高度是总条数乘行高；渲染出来的行整体下移到真实位置，滚动条才仍能表示完整列表。

2. 区间采用左闭右开，开始位置向下取整，结束位置按视口底部向上取整，再向前后扩展 overscan。下面限定没有额外间距，行高包含内边距和边框；对空数据、负滚动位置和数据缩短后的越界一并处理。

    ```js
    function range(count, rowHeight, viewportHeight, scrollTop, overscan = 3) {
      if (rowHeight <= 0) throw new Error('rowHeight must be positive');
      const total = count * rowHeight;
      const top = Math.max(0, Math.min(scrollTop, Math.max(0, total - viewportHeight)));
      const first = Math.floor(top / rowHeight);
      const last = Math.min(count, Math.ceil((top + viewportHeight) / rowHeight));
      const start = Math.max(0, first - overscan);
      const end = Math.min(count, last + overscan);
      return { start, end, offset: start * rowHeight, total };
    }
    // count、overscan 为非负整数，viewportHeight 为正数。
    // 渲染 items.slice(start, end)，占位高度 total，内容 translateY(offset)。
    ```

3. 比如行高四十、视口高一百、scrollTop 为三十，不加预渲染时应显示第零到第三行。视口同时包含顶部和底部的半行，所以不能只用向上取整后的可见行数加开始下标，否则一些位置会少算一行。

4. 滚动处理只读必要位置、更新区间，区间没变就不重复提交列表状态，可以按动画帧合并更新。行 key 使用稳定业务 id，选中或编辑状态也按 id 保存；复用 DOM 不代表可以让上一条数据的状态留在下一条上。

5. 我还会监听容器尺寸变化，并在筛选缩短数据后修正实际滚动位置。动态行高需要测量、累计高度和定位搜索，不能继续使用乘法公式；虚拟化减少 DOM 成本，但不会自动减少全量数据的下载、存储和筛选成本。

## 追问：动态行高为什么需要前缀和与二分查找？

1. 每行高度不一样时，第 k 行的顶部位置等于前面所有行高度之和。我会建立长度为条数加一的累计高度数组，第一项为零，这样可以直接读取行的偏移和总高度，未测量的行先用估计高度代替。

2. 查找 scrollTop 对应哪一行，就变成在累计高度里寻找所在区间，可以用二分查找。定位开销降下来后，还要注意更新开销：普通前缀和数组修改一行高度，会连带修改后续值，不能笼统说所有操作都是对数复杂度。

3. 图片加载或文本换行会让测量高度继续变化，所以测量后还要维护滚动锚点。若当前阅读项上方的累计高度增加，应按差值调整位置以保留视觉位置；同时避免和浏览器已有的滚动锚定重复补偿，造成反向跳动。

## 追问：列表项带输入框，滚出视口后内容会不会丢失？

1. 如果输入值只保存在行组件内部，行被卸载后状态可能丢失；如果用下标作 key，节点复用还可能把草稿显示到另一条数据。我会按稳定业务 id，把需要保留的编辑值放到列表外的状态中。

2. 焦点也不能随意交给卸载流程处理，用户正在编辑的行可以暂时保留在渲染集合里。若确实需要移动焦点，应先定位下一项并等待它挂载，再聚焦对应输入框，而不是在不存在的节点上调用 focus。

3. 草稿保存范围应根据产品需求决定，不能让所有访问过的行永久堆积状态。确认提交或取消编辑后可以清理草稿；如果同一业务项被远端更新，还要说明采用哪个版本，虚拟列表本身不负责解决编辑冲突。
