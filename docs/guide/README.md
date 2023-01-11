# 指南

## 介绍

Web中实现loading的方式有很多种，例如使用`css`动画、`js`操作元素、`gif`图片、`svg`动画、`ui`框架中自带`loading`等等，各有所优，操作元素可能更方便，但会影响性能或其他元素，动态图片性能很好，但自定义不理想。

`WebLoading` 是一个基于`js`封装的`loading`动画插件，主要通过`Canvas`绘制，不用担心会影响界面中的元素。默认提供多种**model**使用，每个**model**都有特殊的`option`参数进行调节自定义，如果想更贴近业务可以使用`custom`进行自定义，`WebLoading`提供了`BaseModel` 继承`class`让你更方便自定义自己的`loading`。

### 实现

`WebLoading`每一个**model**都是使用`Canvas`绘制，启动方式分别有`DOM`(元素挂载)、`FULL`(全屏)、`MINI`(移动端)。

原理大同小异，这里以`DOM`来说，启动`WebLoading`需要一个`HtmlElement`，该元素必须拥有`children`，而不是一个单标签元素。启动`WebLoading`时会获取到这个挂载的元素，并在`children`添加一个`Canvas`，同时会计算该元素位置以及大小以最优显示同步到`Canvas`上。`WebLoading`会根据`option`参数来绘制具体的**model**，**model**中主要以`requestAnimationFrame`来进行多次渲染。

### 启动方式

`DOM`、`FULL`、`MINI`三种启动方式都需要基于`HtmlElement`，这里`FULL`、`MINI`是扩展的启动方式，参数中无须提供`HtemlElment`，是因为`WebLoading`已经处理的元素的创建到消失的流程。

## 安装

> 根据自己的包管理工具下载。

```sh
npm install web-loading
```

## 引用

### 全局引入

+ 引入

```typescript
import 'web-loading-test'
```

+ 获取元素

```typescript
// 无框架情况
let dom:HtmlElement = document.querySelector('xxx')
// vue 
let dom = ref()
// ...(目的是获取dom元素)
```

+ DOM

```typescript
let loading = dom.loading()
```

> + 参数
>   + `options?:OptionsType`
> + 全局引入后`WebLoading`会自动在所有元素中挂载`loading`函数。

+ FULL与MINI

```typescript
// FULL全屏
let loading = fullLoading()
// mini移动端
let loading = miniLoading()
```

> + 参数
>   + `options?:OptionsType`
> + 全局引入后`WebLoading`会自动在`window`中挂载`fullLoading`与`miniLoading`函数。

### 单独引入

+ 引入

```typescript
import webLoading,{fullLoading,miniLoading} from 'web-loading-test/src/loading'
```

+ 获取元素

```typescript
// 无框架情况
let dom:HtmlElement = document.querySelector('xxx')
// vue 
let dom = ref()
// ...(目的是获取dom元素)
```

+ DOM

```typescript
let loading = webLoading(dom)
```

> + 参数
>   + `dom:HtmlElement`
>   + `options?:OptionsType`

+ FULL与MINI

```typescript
// FULL全屏
let loading = fullLoading()
// mini移动端
let loading = miniLoading()
```

> + 参数
>   + `options?:OptionsType`