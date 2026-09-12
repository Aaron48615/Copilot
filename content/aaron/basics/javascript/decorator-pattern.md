---
id: aaron-basic-javascript-decorator-pattern
title: 装饰器模式怎样在保留原有功能的同时增加能力？
aliases: [怎样用包装对象增强原对象？, 汽车和真皮座椅的例子怎样体现装饰器模式？]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [装饰器模式, 对象包装, 功能增强, 接口委托]
---

# 装饰器模式怎样在保留原有功能的同时增加能力？

## 核心回答

装饰器模式就是在原对象外面再包一层对象。原有能力可以继续交给里面的对象处理，需要增强的部分，再加上自己的逻辑。

这里 `CarDecorator` 保存一个 `car`，获取价格和速度时先交给它。`LeatherSeatsDecorator` 再覆盖获取价格的方法，在原车价格上加上真皮座椅的价格。所以原车是 `10000`，包装后的价格是 `11000`，不用直接修改 `Car` 的价格逻辑。

我比较喜欢这个例子里“组合现有对象”的思路：增加配置时，可以把新增能力放在包装层里。不过包装层要保持需要的接口一致，不能默认被包装对象什么方法都有。

原示例恰好有这个问题：`LeatherSeatsDecorator.getDescription()` 调用了 `this.car.getDescription()`，但 `Car` 没有这个方法。因此最后一行会抛出 `TypeError`，不会像注释写的那样输出 `undefined, Leather seats`。要让描述能力正常工作，需要给原对象提供相应方法，并考虑基础装饰器如何转发这个接口；这属于修正方向，原文件尚未实现。

### 原始示例（注意上文说明的输出注释或接口问题）

```js
/**
 * 装饰器模式是一种在不改变对象自身的基础上，动态地给对象增加新的功能的模式。
 * 在前端开发中，常用于实现组件的复用和功能的增强等。
 * 装饰器模式可以避免类的继承带来的复杂性和耦合度，提高代码的灵活性和可维护性。
 */
class Car {
    constructor() {
      this.price = 10000;
      this.speed = '100 km/h';
    }
  
    getPrice() {
      return this.price;
    }
  
    getSpeed() {
      return this.speed;
    }
  }
  
  // 汽车装饰器
  class CarDecorator {
    constructor(car) {
      this.car = car;
    }
  
    getPrice() {
      return this.car.getPrice();
    }
  
    getSpeed() {
      return this.car.getSpeed();
    }
  }
  
  // 真皮座椅装饰器
  class LeatherSeatsDecorator extends CarDecorator {
    constructor(car) {
      super(car);
      this.price = 1000;
      this.description = 'Leather seats';
    }
  
    getPrice() {
      return this.car.getPrice() + this.price;
    }
  
    getDescription() {
      return this.car.getDescription() + ', ' + this.description;
    }
  }
  
  let car = new Car();
  console.log(car.getPrice()); // 10000
  
  // 带有真皮座椅的汽车
  let carWithLeatherSeats = new LeatherSeatsDecorator(car);
  console.log(carWithLeatherSeats.getPrice()); // 11000
  console.log(carWithLeatherSeats.getDescription()); // undefined, Leather seats
```
