第一课，让我们对`React`工作原理有个大概了解。

`React`的工作大体分为四部分：

```js
触发更新 -> 调度更新 -> 计算本次更新带来的副作用 -> 执行对应副作用
```

其中步骤2不影响我们对整体流程的理解，所以当前我们可以认为`React`的工作流程包括三步：

```js
触发更新 -> 计算本次更新带来的副作用 -> 执行对应副作用
```

我们依次讲解这三步。

## 触发更新

触发更新的方式很多，包括：

- 执行`ReactDOM.render`

- 执行`this.setState`或`this.forceUpdate`

- 执行`const [x, setX] = useState()`中的`setX`（后文称该方法为`dispatchAction`），或`useReducer`的类似方法

......

总之，更新流程都是由于调用了`触发更新`的`API`引起的。

## 计算本次更新带来的副作用

这一步在源码中叫`render`阶段，原因是组件`render`方法的执行就在这个阶段。

`副作用`包括：

- `DOM`的增/删/改（更新属性）

- `useEffect`回调函数执行

......

总之，`render`阶段的目的是找到更新会带来的副作用。

## 执行对应副作用

这一步在源码中叫`commit`阶段，类似`git commit`提交代码（这里指将`副作用`提交给视图）。

这一步会遍历`render`阶段找到的`副作用`并依次执行他们。
## 执行课程1示例

接下来请你理论结合实际，自己动手感受下这3个阶段的存在。

运行`习题_1`，打开控制台，你会发现打印了3条消息：

```js
开始render阶段，计算本次更新带来的副作用
开始commit阶段，执行副作用
副作用：App（函数组件）插入  FiberNode {tag: 0, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
```

这次更新是调用`ReactDOM.render`造成的。

在第三行可以看到包含副作用的是`App`组件对应的`FiberNode`（第二课会讲到），执行的操作是：插入。

所以，我们可以推断：执行`ReactDOM.render`后触发一次更新，更新使`App`组件对应的`FiberNode`产生副作用，该副作用的类型为**插入DOM**。

具体插入的`DOM`是什么呢？你可以展开`FiberNode.child.stateNode`看看。就是首屏渲染的完整`DOM`树。

现在试试点击**点我种蘑菇**，会在`ul`下插入一个`li`，日志打印如下：

```js
开始render阶段，计算本次更新带来的副作用
开始commit阶段，执行副作用
副作用：button更新属性  FiberNode {tag: 5, key: null, elementType: "button", type: "button", stateNode: button, …} 
副作用：button更新属性  FiberNode {tag: 5, key: null, elementType: "button", type: "button", stateNode: button, …}
副作用：li插入  FiberNode {tag: 5, key: "0", elementType: "li", type: "li", stateNode: li, …}
```

这次更新是由于调用`useState`的`dispatchAction`造成的，会产生3个副作用。

::: details 思考题：为什么button会更新属性？
2个`button`之所以会更新属性，是因为绑定在`onClick`的回调（`add`与`del`）在每次`render`时都是一个全新方法，所以`React`认为该属性更新了
:::


接下来请你自由发挥，充分感受`React`的三步更新流程。

当学习完本节课后，记得做课后习题哦。

## 总结

请牢记这三步工作流程：

```js
触发更新 -> 计算本次更新带来的副作用（render阶段） -> 执行对应副作用（commit阶段）
```

`React`大部分`API`的调用都发生在`render`、`commit`阶段。在后面的课程中当我们讲到某个`API`的调用流程时，希望你能立刻脑补出他在这三个步骤中的位置。

记得打开`课程1/homework/index.ts`做作业哦。