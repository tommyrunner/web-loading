> 这里的使用都以单独引入为例，全局引入使用类似 [链接]

# `WebLoading`

> 无论是`DOM`还是`FULL`、`MINI`最终都会走`WebLoading`

```typescript
import webLoading from 'web-loading/src/loading'
// 获取dom
let dom:HtmlElement = document.querySelector('xxx')
let loading = webLoading(dom)
console.log(loading)
```

> `loading`：`reload`、`resize`、`close`函数

## reload

> 重新加载`loading`

+ 参数
  + `options?:OptionsType`

> 调用loading后`WebLoading`会保存一份`options`，`reload`默认使用上一次的`options`，但`reload`接受`options`参数可以覆盖之前配置。

## resize

> 重新计算并绘制`loading`大小

+ 参数：无

> `resize`会从绑定的`HtmlElement`中重新获取大小并重新绘制，此函数不会重新实例`WebLoading`与`reload`业务场景不同，例如`window.addEventListener('resize', loading.resize)`可能会使用到

## close

> 关闭`loading`

+ 参数：无

> `close`首先会清空所有`WebLoading`的`store`以及其他记录，并停止`requestAnimationFrame`调用，最后根据`delayColse`清除相关元素，关闭过程中`WebLoading`会使用`hookCall`触发`hook`关闭**钩子函数**(`BEFORE_COLSE`:关闭前，`COLSED`：关闭后，也就是清除元素后)，以便于绘制**model**。

# options

```typescript
import { MODEL_TYPES } from "web-loading/src/utils";
import webLoading from 'web-loading/src/loading'
// 获取dom
let dom:HtmlElement = document.querySelector('xxx')
let loading = webLoading({
    model:MODEL_TYPES.GEAR
})
```

## 公共

+ 类型

```typescript
interface OptionsType {
  // 自定义model
  custom?: any
  // loading启动方式(默认DEF)[只读]
  type?: LOADING_TYPES
  // mini模式的class
  miniClass?: string | null | undefined
  // model 模块
  model?: MODEL_TYPES
  // 字体内容
  text?: string
  // 字体间距
  textGap?: number
  // 字体大小
  fontSize?: number
  // 字体类型
  fontFamily?: string
  // 动画延迟
  delay?: number
  // 关闭动画延迟
  delayColse?: number
  // 优化处理
  optimization?: boolean
  // loading层级
  zIndex?: string
  // 主题色
  themeColor?: string
  // 背景色
  bgColor?: string
  // 阴影色
  shadowColor?: string
  // 阴影X
  shadowOffsetX?: number
  // 阴影Y
  shadowOffsetY?: number
  // 阴影范围
  shadowBlur?: number
  // 事件穿透(DOM方式)
  pointerEvents?: boolean
}
```

+ 默认值

```typescript
{
    custom: null,
    type: LOADING_TYPES.DOM,
    miniClass: 'mini',
    model: MODEL_TYPES.RING,
    text: '加载中...',
    textGap: 8,
    fontSize: 12,
    fontFamily: 'Microsoft YaHei',
    delay: 65,
    delayColse: 520,
    optimization: false,
    zIndex: '2001',
    themeColor: 'rgba(64,158,255,1)',
    bgColor: 'rgba(0, 0, 0, 0.8)',
    shadowColor: 'rgba(64,158,255,0.6)',
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowBlur: 5,
    pointerEvents: false
}
```

## model

【链接】

# custom自定义model

+ 自定义

```typescript
// 1.引入基础model
import { OptionsType, ElementStoreType } from "web-loading/src/types.d";
import BaseModel from "web-loading/src/draw/model/BaseModel";
// 2?.如果自己的options需要自定义参数，定义options类型
interface CustomOptionsType extends OptionsType {
  size: number;
}
// 3.自定义model(如果无需自定义options参数，使用OptionsType即可)
class CustomLoading extends BaseModel<CustomOptionsType> {
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<CustomOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store);
        this.run(this.draw);
    }
    draw() {
         let op = this.options;
        // 根据延迟时间绘制(这里获取配置的自定义options参数)
        this.ctx.fillRect(0, 0, op.size, op.size);
    }
}
```

> + `BaseModel`是自定义继承类，如果是全局引入情况下，元素中是挂有`BaseModel`属性的。
> + `WebLoading`调用`custom`的时候会自动注入相关参数。

`BaseModel`参数

| 参数    | 类型                          | 备注                                                         |
| ------- | ----------------------------- | ------------------------------------------------------------ |
| w       | `number`                      | 画布宽度                                                     |
| h       | `number`                      | 画布高度                                                     |
| canvas  | `HTMLCanvasElement`           | 画布元素，`BaseModel`默认以及获取了`2d`的上下文，但您还可以根据画布元素获取其他上下文 |
| options | `Required<CustomOptionsType>` | `Required`标注你的参数不为空方便使用，                       |
| store   | `ElementStoreType`            |                                                              |



+ loading

```typescript
import { LoadingType} from "web-loading/src/types.d";
import { MODEL_TYPES } from "web-loading/src/utils";
import webLoading from 'web-loading/src/loading'
let dom:HtmlElement = document.querySelector('xxx')
// 4?.配置自定义的options参数
let options: CustomOptionsType = {
  // 配置custom后优先级大于model
  custom: CustomLoading,
  size: 10,
};
let loading:LoadingType = webLoading(options)
```

