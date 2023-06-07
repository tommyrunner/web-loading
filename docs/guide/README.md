# 指南

>  最近改动:
>
> + ***因更换打包方式《引入对象或类型》路径发生改变，按最新文档为准***
> + 新增 无感刷新
> + 优化源码
> + 解决秒关闪屏bug

## 介绍

Web 中实现 loading 的方式有很多种，例如使用`css`动画、`js`操作元素、`gif`图片、`svg`动画、`ui`框架中自带`loading`等等，各有所优，操作元素可能更方便，但会影响性能或其他元素，动态图片性能很好，但自定义不理想。

`WebLoading` 是一个基于 web 封装的`loading`动画插件，主要**model**是通过`Canvas`绘制，这种方式不会影响到界面中的元素，当然，`WebLoading`也提供了`html`配置兼容了**html**加载方式。默认的**model**模块都提供了独自的`options`配置属性，如果想更贴近业务可以使用`Custom`进行自定义，`WebLoading`提供了`BaseModel` 继承`class`让你更方便自定义自己的`loading`，或者`html`加载方式。

## 实现

`WebLoading`中每一个**model**都是使用`Canvas`绘制，启动方式分别有`DOM`(元素挂载)、`FULL`(全屏)、`MINI`(移动端)。

原理大同小异，这里以`DOM`来讲述，首先我们需要`initLoading`初始化你需要渲染的**model**并提供自定义参数，当然，这个操作不是必须的，因为`WebLoading`已经初始化所以的默认数据，此时抛出操作`WebLoading`相关函数。

启动`WebLoading`调用`loading`函数需要一个`HtmlElement`元素，该元素必须拥有`children`，而不是一个单标签元素。启动`WebLoading`时会获取到这个挂载的元素，并在`children`添加一个`Canvas`，同时会计算该元素位置以及大小以最优显示同步到`Canvas`上。`WebLoading`会根据`options`参数来绘制具体的**model**，**model**中主要以`requestAnimationFrame`来进行递归回调渲染，以来实现每一帧动画。

注意：如果配置是通过**html**渲染，那么就不会走上一步。

`WebLoading`封装上主要分隔三层

- 交互层：开发者与`WebLoading`的操作，例如初始化、启动、关闭、获取相关信息等等。
- 逻辑层：获取到`WebLoading`接收`options`后进行初始化挂载的元素以及`canvas`等等。
- model 层：继承`BaseModel`获取初始化后的`canvas`进行绘制模块。

## 安装

> 根据自己的包管理工具下载。

```sh
npm install web-loading
```

## 使用

### CDN引入

```html
<script src="https://cdn.jsdelivr.net/npm/web-loading"></script>
```

### 工程项目引入

```typescript
import type { LoadingType } from "web-loading";
import { initLoading } from "web-loading";
let webLoading: LoadingType = initLoading({
  // 自定义options
})
```

> - 参数
>   - `options?:OptionsType`
> - 返回
>   - `webLoading:LoadingType`

### 获取元素

```typescript
// 无框架情况
let dom = document.querySelector('xxx')
// vue
let dom = ref()
// ...如果是FULL或MINI不需要获取元素
```

### 启动

```typescript
// 注意:在dom加载完成后在调用loading
window.onload = function () {
  webLoading.loading(dom)
}
```

> 参数
>
> - `dom`:挂载的`HtmlElement`元素
>
> - `options?:OptionsType`，支持覆盖`options`。

## 启动方式

`DOM`、`FULL`、`MINI`三种启动方式都需要基于`HtmlElement`，这里`FULL`、`MINI`是扩展的启动方式，参数中无须提供`HtemlElment`，是因为`WebLoading`已经处理的元素的创建到消失的流程。

```typescript
import type { LoadingType } from "web-loading";
import { fullLoading,miniLoading LOADING_TYPES } from "web-loading";

let webLoading: LoadingType = fullLoading() // 全屏
// let webLoading: LoadingType = miniLoading() // 移动端

// 启动(如果是MINI或者FULL无需传递dom)
webLoading.loading()
```
