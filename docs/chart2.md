上节课我们讲到，`render`阶段的目的是：计算本次更新带来的副作用。具体是如何办到的呢？答案是：通过虚拟DOM树的比较。

在`React`中，`虚拟DOM`被称为`fiberNode`（在`Vue`中被称为`VNode`）。

> 后文都会使用`fiberNode`指代`虚拟DOM`

我们按`mount`（首次渲染）与`update`（更新）来看：

`mount`时的`render`阶段，`React`会为每个`ReactElement`创建对应`fiberNode`，每个新生成的`fiberNode`会与已有`fiberNode`连接形成`fiber树`。

`update`时的`render`阶段，`React`会将每个`ReactElement`与其`mount`时创建的`fiberNode`进行比较，如果存在差异，这个差异就是本次更新带来的副作用。比较后再创建`fiberNode`。

本节我们主要学习`fiberNode`创建的顺序。了解创建顺序，就能知道组件：

- `render`函数执行的顺序

- 生命周期执行的顺序

- `Hooks`执行的顺序

- 性能优化的顺序

## 执行课程2示例

打开控制台，可以看到`render`创建对应`fiberNode`的过程。

具体来说，这个过程遵循**深度优先遍历**，即：从根节点出发，沿着左子树方向进行纵向遍历，直到找到叶子节点为止。 然后回溯到前一个节点，进行右子树节点的遍历，直到遍历完所有可达节点为止。

你可以修改下示例（如增加几个函数组件），加深对整个过程的理解。

展开示例中创建的任意一个`fiberNode`的数据结构，会发现如下几个字段：

- child，连接自己的`子fiberNode`

- sibling，连接自己`兄弟fiberNode`

- return，连接自己`父fiberNode`

通过这几个字段，所有`fiberNode`连接在一起组成`fiber树`。

## 总结

`render`阶段会采用`深度优先遍历`生成`fiber树`，并在这个过程中收集副作用。

记得打开`课程2/homework/index.ts`做作业哦。


