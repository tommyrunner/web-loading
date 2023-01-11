# 使用

> 这里的使用都以单独引入为例，[全局引入](../guide/#全局引入)使用类似。

## `WebLoading`

> 无论是`DOM`还是`FULL`、`MINI`最终都会走`WebLoading`。

```typescript
import webLoading from 'web-loading/src/loading'
// 获取dom
let dom:HtmlElement = document.querySelector('xxx')
let loading = webLoading(dom)
console.log(loading)
```

> `loading`：`reload`、`resize`、`close`函数。

### reload

> 重新加载`loading`。

+ 参数
  + `options?:OptionsType`

> 调用loading后`WebLoading`会保存一份`options`，`reload`默认使用上一次的`options`，但`reload`接受`options`参数可以覆盖之前配置。

### resize

> 重新计算并绘制`loading`大小。

+ 参数：无

> `resize`会从绑定的`HtmlElement`中重新获取大小并重新绘制，此函数不会重新实例`WebLoading`与`reload`业务场景不同，例如`window.addEventListener('resize', loading.resize)`可能会使用到。

### close

> 关闭`loading。`

+ 参数：无

> `close`首先会清空所有`WebLoading`的`store`以及其他记录，并停止`requestAnimationFrame`调用，最后根据`delayColse`清除相关元素，关闭过程中`WebLoading`会使用`hookCall`触发`hook`关闭**钩子函数**(`BEFORE_COLSE`:关闭前，`COLSED`：关闭后，也就是清除元素后)，以便于绘制**model**。

## options

```typescript
import { MODEL_TYPES } from "web-loading/src/utils";
import webLoading from 'web-loading/src/loading'
// 获取dom
let dom:HtmlElement = document.querySelector('xxx')
let loading = webLoading({
    model:MODEL_TYPES.GEAR
})
```

### 公共

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

### model

【链接】

## custom自定义model

### 例子

+ 自定义

```typescript
// 1.引入基础model
import { OptionsType, ElementStoreType } from "web-loading/src/types.d";
import BaseModel from "web-loading/src/draw/model/BaseModel";
// 2?.如果自己的options需要自定义参数，定义options类型
interface CustomOptionsType extends OptionsType {
  size?: number;
}
// 3.自定义model(如果无需自定义options参数，使用OptionsType即可)
// 3.1?. 定义默认值
let defOptions: CustomOptionsType = {
  size: 10, // 定义默认值
};
class CustomLoading extends BaseModel<CustomOptionsType> {
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<CustomOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store);
        // 3.2?. 初始化默认值
        this.initOptions(defOptions);
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
> + `BaseModel`内部会调用`_$initPoint`初始化画笔`translate`在中间位置。
> + 这里如果自定义的**model**无需`options`参数，可以省略**2、3.1、3.2、4.2**步骤。

+ loading

```typescript
import { LoadingType} from "web-loading/src/types.d";
import { MODEL_TYPES } from "web-loading/src/utils";
import webLoading from 'web-loading/src/loading'
let dom:HtmlElement = document.querySelector('xxx')
// 4.配置自定义的options参数
let options: CustomOptionsType = {
  // 4.1.配置custom后优先级大于model
  custom: CustomLoading,
  // 4.2.配置自定义参数
  size: 10,
};
let loading:LoadingType = webLoading(options)
```

### `BaseModel`参数

> `WebLoading`调用`custom`的时候会自动注入相关参数。

| 参数      | 类型                          | 备注                                                         |
| --------- | ----------------------------- | ------------------------------------------------------------ |
| `w`       | `number`                      | 画布宽度                                                     |
| `h`       | `number`                      | 画布高度                                                     |
| `canvas`  | `HTMLCanvasElement`           | 画布元素，`BaseModel`默认以及获取了`2d`的上下文，但您还可以根据画布元素获取其他上下文 |
| `options` | `Required<CustomOptionsType>` | `options`是调节**model**参数，分为有**公共**参数与**model**参数最终会合并，`Required`标注你的参数不为空(已经初始值) |
| `store`   | `ElementStoreType`            | [ElementStoreType](#store-elment-elementtype)                                                       |

### `store:ElementStoreType`

> 绘制**model**时需要用到`WebLoading`的一些**状态**。

| 属性        | 类型                        | 备注                      |
| ------------- | ----------------------------- | --------------------------- |
| `element`     | `ElementType`                 | 绑定的元素                |
| `options`     | `OptionsType`                 | 储存最终合并的`options`参数 |
| `animationId` | `number或undefined`           | 记录`animation`状态       |
| `loadingId`   | `string或null`                 | 记录`loading`元素`id`   |
| `hookCall`    | `HooksCallType`               | `loading`的钩子函数       |
| `model`       | `BaseModel或null` | 正在使用的**model**       |

### `store.elment:ElementType`

> 继承了`HTMLElement`。

| 属性                 | 类型               | 备注    |
| -------------------- | ------------------ | ------- |
| `loadingId`          | `string或null`      | 记录`loading`元素`id`  |
| `$store`             | `ElementStoreType` | [$store](#store-elementstoretype) |
| `HTMLElement属性...` | ...                | ...     |

### `store.hookCall:HooksCallType`

> `WebLoading`关闭时触发的钩子函数。
>
> `HOOKSCALL_KEY`枚举。

| 属性           | 枚举值        | 类型       | 备注               |
| -------------- | ------------- | ---------- | ------------------ |
| `BEFORE_COLSE` | `beforeColse` | `Function` | 关闭前             |
| `COLSED`       | `colsed`      | `Function` | 关闭后(删除元素后) |

以自定义`custom`为例

```typescript
// 其余code省略
class CustomLoading extends BaseModel<CustomOptionsType> {
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<CustomOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store);
        this.initOptions(defOptions);
        this.run(this.draw);
        this.store.hookCall.beforeColse(() => {
            console.log("关闭前");
        });
        this.store.hookCall.colsed(() => {
            console.log("关闭后");
        });
    }
    draw() {
        let op = this.options;
        this.ctx.fillRect(0, 0, op.size, op.size);
    }
}
```



### `BaseModel函数`

> `BaseModel`自带的函数主要是用户**扩展model**绘制

| 函数                  | 返回   | 备注   |
| --------------------- | ------ | ------ |
| `initOptions`         | `void` | [initOptions](#basemodel-initoptions) |
| `run`                 | `void` | [run](#basemodel-run)  |
| `clearRect`           | `void` | [clearRect](#basemodel-clearrect)  |
| `drowRadiusRect`      | `void` | [drowRadiusRect](#basemodel-drowradiusrect)  |
| `clearAnimationFrame` | `void` | [clearAnimationFrame](#basemodel-clearanimationframe)  |

### `BaseModel:initOptions`

> 主要是初始化默认参数，使得绘制**model**里的`options`不会为空。

| 参数       | 类型                    | 备注           |
| ---------- | ----------------------- | -------------- |
| `options`  | `T extends OptionsType` | 初始化默认参数 |
| `limits?:` | `Array<LimitType>`      | 值的限制       |

### `BaseModel.initOptions:LimitType`

> 用于判断传入的`options`是否超出绘制的**model**预期范围。

| 属性      | 类型                    | 备注                                                         |
| --------- | ----------------------- | ------------------------------------------------------------ |
| `key`     | `string`                | 需要判断的`options`的属性                                    |
| `message` | `string`                | 如果判断生效，提示文字                                       |
| `limit`   | `(key: any) => boolean` | 判断条件，key是`options`传入的值，如果返回为`false`代表超出预期 |

以自定义`custom`为例

```typescript
// 其余code省略
let defOptions: CustomOptionsType = {
    size: 10, // 定义默认值
};
const limits = [
    {
        key: 'size',
        message: '16 >= size(default:10) >= 5',
        limit: (key: any) => {
            return  16 >= key && key >= 5
        }
    },
]
class CustomLoading extends BaseModel<CustomOptionsType> {
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<CustomOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store);
        this.initOptions(defOptions,limits);
    }
}
```

### `BaseModel:run`

> 根据`options`.delay延迟触发`requestAnimationFrame`。

| 参数  | 类型       | 备注                                       |
| ----- | ---------- | ------------------------------------------ |
| `fun` | `Function` | 调用之前如果正处于加载，会清空上次的状态。 |

```typescript
this.run(()=>{
    // 根据options.delay触发
})
```

### `BaseModel:clearRect`

> 清空画布。

| 参数    | 类型     | 备注                                           |
| ------- | -------- | ---------------------------------------------- |
| `x?:`   | `number` | 清空起点X                                      |
| `y?:`   | `number` | 清空的起点Y                                    |
| `w_r?:` | `number` | 清空终点X(宽度)，圆形清空情况下`w_r`是**半径** |
| `h?:`   | `number` | 清空终点Y(高度)                                |

+ 清空全部

```typescript
this.clearRect()
```

> 考虑到绘制区域可能会超出默认宽高，全部清空会清空**两倍**的宽高。

+ 自定义清空

```typescript
this.clearRect(0,0,100,100)
```

> 清空从`x=0,y=0`的坐标开始，到`x=100,y=100`终止。

+ 圆形区域清空

```js
this.clearRect(0,0,10)
```

> 清空`x=0,y=0`并且半径为`10`的区域。

### `BaseModel:drowRadiusRect`

> 绘制含有圆角的矩形。

| 参数 | 类型     | 备注        |
| ---- | -------- | ----------- |
| `x`  | `number` | 起点X       |
| `y`  | `number` | 起点Y       |
| `w`  | `number` | 终点X(宽度) |
| `h`  | `number` | 终点Y(高度) |

```typescript
 this.drowRadiusRect(0, 0, 100, 100, 10)
// 需要自己绘制
this.ctx.fill()
```

> 绘制`x=0,y=0`宽高为`100`并圆角为`10`的矩形。

### `BaseModel:clearAnimationFrame`

> 清空(停止)`requestAnimationFrame`。

| 参数 | 类型     | 备注          |
| ---- | -------- | ------------- |
| `id` | `number` | `animationId` |

```typescript
this.clearAnimationFrame(this.store.animationId)
```

> 传入的id是`requestAnimationFrame`返回的`id`，`WebLoading`在store中已经保存。

### `BaseModel`自定义例子

[链接]
