第一节课我们聊到触发更新的几种方式，比如：

- 执行`ReactDOM.render`

- 执行`this.setState`或`this.forceUpdate`

- 执行`useState`中的`dispatchAction`

......

其中`mount`时的更新是由于调用`ReactDOM.render`触发的。本节我们通过`useState`的`dispatchAction`举例，来了解`React`的整体更新流程。

更新流程大体可分为几步：

1. 某个组件触发更新

2. 进入`render`阶段，开始生成`fiber树`

3. 生成过程进行到触发更新的组件时，如果更新导致的状态变化会产生副作用，则标记该副作用

4. 进入`commit`阶段，执行副作用

这几个步骤为我们带来亮点启示：

1. `React`并不关心是谁触发了更新

从以上步骤可以看出，任何一个组件触发更新，都会进入`render`阶段并生成一棵完整的`fiber树`。

2. “更新”是一种数据结构

触发更新的组件与`render`阶段遍历的其他组件唯一的区别是：触发更新的组件内存在代表“更新”的数据结构。根据该数据结构计算出新状态，新状态再对应副作用。

## 执行课程3示例

示例包含多个函数组件，其中`Parent`包含状态`num`，该状态会作为`props`传递给`Child`：

```jsx

function Parent() {
  const [num, updateNum] = useState(0);
  return <Child num={num} onChange={updateNum}/>;
}

function Child({num, onChange}: {num: number; onChange: (num: number) => void;}) {
  return <div onClick={() => onChange(num + 1)}>{num}</div>;
}
```

打开控制台，你会看到一行蓝字：

> Parent（函数组件或类组件）的useState根据初始state计算出新state：  0

`num`的初始值是0，该值是`useState(0)`中定义的。

现在点击示例区域，触发更新。

`React`发现`Parent`触发了更新，于是创建代表更新的数据结构`Update`：

```js
//  Parent（函数组件）触发了更新，创建Update：  
{
  action: 1,
  // 其他字段省略...
}
```

其中`action`字段代表要更新的状态。

当`render`阶段遍历到`Parent`组件发现该`Update`，就会基于他计算新的`num`状态，`num`的变化导致`div更新属性`副作用，最终在`commit`阶段执行副作用。

:::details 思考题：Update为什么有个next字段指向自己？

其实`Update`的`next`字段并不是指向`Update`自身，而是形成环状链表。

每次基于`Update`计算状态时也是遍历整条链表计算最终状态。

什么情况下会有多个`Update`呢？有几种情况，这里介绍一种简单的：

```js
onClick() {
  updateNum(num => num + 1);
  updateNum(num => num * 2);
  updateNum(num => num / 3);
}
```

在一个组件中连续触发3次更新，就会形成3个`Update`，他们会形成环状链表

:::