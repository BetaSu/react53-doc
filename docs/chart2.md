上节课我们讲到，`render`阶段的目的是：计算本次更新带来的副作用。具体是如何办到的呢？答案是：通过虚拟DOM树的比较。

在`React`中，`虚拟DOM`被称为`fiberNode`（在`Vue`中被称为`VNode`）。

> 后文都会使用`fiberNode`指代`虚拟DOM`

我们按`mount`（首次渲染）与`update`（更新）来看：

`mount`时的`render`阶段，`React`根据每个组件`render`后返回的数据创建`fiberNode`，每个新生成的`fiberNode`会与已有`fiberNode`连接形成`fiber树`。

`update`时的`render`阶段，同样，`React`将每个组件`render`后返回的数据与该组件`mount`时创建的`fiberNode`进行比较，如果存在差异，这个差异就是本次更新带来的副作用。比较后再创建`fiberNode`。

本节我们主要学习`fiberNode`创建的顺序。了解创建顺序，就能知道组件：

- `render`函数执行的顺序

- 生命周期执行的顺序

- `Hooks`执行的顺序

- 性能优化的顺序

## 执行课程2示例

打开控制台，可以看到`fiberNode`的创建顺序为：

```js
根组件
App（函数组件）
div
p
ul
li
li
li
```

实际上，`React`采用**深度优先遍历**的方式创建`fiberNode`，遍历过程可以分为`递`与`归`两部分，具体规则为：

- 从`根组件`开始创建

- 如果组件存在子组件，创建子组件对应`fiberNode`（递的过程）

- 如果组件不存在子组件但存在兄弟组件，创建兄弟组件对应`fiberNode`（递的过程）

- 如果不存在子组件与兄弟组件，则回到父组件（归的过程）

从`根组件`开始`递`，最终又会`归`到`根组件`。

你可以修改下示例（如增加几个函数组件），加深创建过程的理解。

展开示例中任意一个`fiberNode`，会发现如下几个字段：

- child，连接自己的`子fiberNode`

- sibling，连接自己`兄弟fiberNode`

- return，连接自己`父fiberNode`

通过这几个字段，所有`fiberNode`连接在一起组成`fiber树`。

## 总结

`render`阶段会采用`深度优先遍历`生成`fiber树`，并在这个过程中收集副作用。

记得打开`课程2/homework/index.ts`做作业哦。