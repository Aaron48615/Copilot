---
id: aaron-basic-javascript-factory-pattern
title: 工厂模式是什么，为什么把对象创建放进工厂？
aliases: [工厂怎样分离对象的创建和使用？, ProductFactory 在这个示例中起什么作用？]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [工厂模式, 对象创建, 封装]
---

# 工厂模式是什么，为什么把对象创建放进工厂？

## 核心回答

工厂模式就是把创建对象的步骤集中放到一个入口里。调用方只告诉工厂需要什么，再拿到对象使用，不用在每个地方都写一遍创建过程。

这份代码里，`ProductFactory.createProduct(name)` 内部调用 `new Product(name)`，外面拿到 `product` 后，再用 `getName()` 读取名字。这样对象怎么创建由工厂负责，对象怎么使用由调用方负责。

不过这份示例只创建一种 `Product`，传不同名字也还是同一种类型，没有根据类型选择不同产品的分支。它主要演示的是把创建入口封装起来，不能说代码已经实现了多种产品的选择。

我觉得如果创建过程就一行 `new`，直接写也很清楚；当很多地方都要创建对象，或者创建步骤经常变化时，集中到工厂里才更方便统一维护。

### 原始示例

```js
/**
 * 工厂模式是一种根据参数的不同创建不同对象的模式。
 * 在前端开发中，常用于创建不同类型的组件、插件等。
 * 工厂模式可以将对象的创建和使用分离，提高代码的灵活性和可维护性。
 */
class Product {
    constructor(name) {
      this.name = name;
    }
  
    getName() {
      return this.name;
    }
  }
  
  class ProductFactory {
    static createProduct(name) {
      return new Product(name);
    }
  }
  
  // 使用示例
  const product = ProductFactory.createProduct("Example Product");
  console.log(product.getName()); // "Example Product"

  
/**
 * Product 类表示要创建的产品，ProductFactory 类实现了工厂模式，
 * 通过 createProduct 方法创建产品实例。在使用时，可以通过工厂类创建产品实例，
 * 而不需要直接调用产品类的构造函数。通过工厂模式可以将对象的创建和使用分离，
 * 提高代码的灵活性和可维护性

 */
```
