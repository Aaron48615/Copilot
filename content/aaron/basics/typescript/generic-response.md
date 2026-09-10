---
id: aaron-basic-typescript-generic-response
title: 泛型在接口数据类型里怎么用？
aliases: [为什么封装请求时会用泛型？, TypeScript 泛型比直接写 any 好在哪里？]
category: typescript
difficulty: 基础
priority: high
projects: []
keywords: [泛型, ApiResponse, 类型参数, 接口封装]
---

# 泛型在接口数据类型里怎么用？

## 核心回答

泛型就是把具体类型先留一个位置，使用时再确定，外面的结构照样能复用。比如接口外面都有 code、message、data，只有 data 不一样：有的返回用户，有的返回列表，就可以把 data 的类型写成参数 T。

```ts
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};
type User = { id: number; name: string };
type UserResponse = ApiResponse<User>;
```

这样拿到 UserResponse 时，data.name 就有对应提示。如果直接用 any，这层字段信息就丢了。我挺喜欢这种写法，公共结构不用重复写，具体字段的提示又能保留下来。不过这个类型只是约定，服务器真返回了什么，还是得检查。
