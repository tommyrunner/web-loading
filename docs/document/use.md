# 使用

> 这里的使用都以单独引入为例，[全局引入](../guide/#全局引入)使用类似。

## `WebLoading`

> 无论是`DOM`还是`FULL`、`MINI`最终都会走`WebLoading`。

```typescript
import initLoading from 'web-loading/src/loading'
let webLoading = initLoading({})
console.log(webLoading)
```

> `webLoading`：`loading`、`resize`、`close`、`update`、`getOptions`、`getLoadingId`。

### loading

> 启动动画`loading`。

+ 参数：
  + `dom:HTMLElement`
  + `options?:OptionsType`

+ 返回：void

> 调用`loading`函数，会先检查`loadingId`是否存在(是否还在绘制)，只有无绘制状态才会启动。
>
> `loading`参数2，可以覆盖初始化`initLoading`的`options`。

### resize

> 重新计算并绘制`loading`大小。

+ 参数：无
+ 返回：void

> `resize`会从绑定的`HtmlElement`中重新获取大小并重新绘制，此函数不会重新实例`WebLoading`与`loading`业务场景不同，例如`window.addEventListener('resize', loading.resize)`可能会使用到。

### close

> 关闭`loading。`

+ 参数：无
+ 返回：void

> `close`首先会清空所有`WebLoading`的`store`以及其他记录，并停止`requestAnimationFrame`调用，最后根据`delayColse`清除相关元素，关闭过程中`WebLoading`会使用`hookCall`触发`hook`关闭**钩子函数**(`BEFORE_COLSE`:关闭前，`COLSED`：关闭后，也就是清除元素后)，以便于绘制**model**。

### update

> 动态绘制`model`，不能动态修改[公共配置](#公共)。

+ 参数：
  + `options?:OptionsType`
+ 返回：void

> `update`函数不会重新实例`WebLoading`，并通过参数`options`重新绘制`model`。业务场景与`loading`类似，但`loading`每次都会初始化`WebLoading`，只有每次关闭才能实现相应业务，所以在动态绘制`model`业务场景下推荐使用`update`。

### getOptions

> 获取当前options配置。

+ 参数：无

+ 返回：
  + `options:OptionsType`

### getLoadingId

> 获取 `loadingId`。

+ 参数：无

+ 返回：
  + `loadingId:string | null`

> `loadingId`在初始化会赋值，`close`关闭后会赋值为`null`，因此，如果`loadingId`为`null`当前无绘制状态，否则相反。

## options

```typescript
import { MODEL_TYPES } from "web-loading/src/utils";
import initLoading from 'web-loading/src/loading'
let webLoading = initLoading({
    model:MODEL_TYPES.GEAR
})
```

### 公共

| 属性              | 类型                          | 默认值                 | 备注                                   |
| ----------------- | ----------------------------- | ---------------------- | -------------------------------------- |
| `html?:`          | `string`                      | `''`                   | **html**加载方式(**优先级大于custom**) |
| `custom?:`        | `any`                         | `null`                 | 自定义**model**(**优先级大于model**)   |
| `type?:`          | `LOADING_TYPES`               | `LOADING_TYPES.DOM`    | 启动方式                               |
| `miniClass?:`     | `string 或 null 或 undefined` | `mini`                 | 启动方式为**MINI**时的**class**        |
| `model?:`         | `MODEL_TYPES`                 | `MODEL_TYPES.RING`     | model模块                              |
| `text?:`          | `string`                      | `加载中...`            | 字体内容                               |
| `textGap?:`       | `number`                      | `8`                    | 字体间距                               |
| `fontSize?:`      | `number`                      | `12`                   | 字体大小                               |
| `fontFamily?:`    | `string`                      | `Microsoft YaHei`      | 字体类型                               |
| `delay?:`         | `number`                      | `65`                   | 动画延迟                               |
| `delayColse?:`    | `number`                      | `520`                  | 关闭动画延迟                           |
| `optimization?:`  | `boolean`                     | `false`                | 优化处理（暂不支持）                   |
| `zIndex?:`        | `string`                      | `2001`                 | loading层级                            |
| `themeColor?:`    | `string`                      | `rgba(64,158,255,1)`   | 主题色                                 |
| `bgColor?:`       | `string`                      | `rgba(0, 0, 0, 0.8)`   | 背景色                                 |
| `shadowColor?:`   | `string`                      | `rgba(64,158,255,0.6)` | 阴影色                                 |
| `shadowOffsetX?:` | `number`                      | `2`                    | 阴影X                                  |
| `shadowOffsetY?:` | `number`                      | `2`                    | 阴影Y                                  |
| `shadowBlur?:`    | `number`                      | `5`                    | 阴影范围                               |
| `pointerEvents?:` | `boolean`                     | `false`                | 事件穿透(**DOM**方式)                  |

+ LOADING_TYPES

| 属性 | 枚举值 | 备注   |
| ---- | ------ | ------ |
| DOM  | `dom`  | 元素   |
| FULL | `full` | 全屏   |
| MINI | `mini` | 移动端 |

+ MODEL_TYPES

[支持的model](./model.html#支持的model)

### model

[model配置详情](./model.md)

## custom自定义model

### 例子

+ 自定义

```typescript
import type { OptionsType, ElementStoreType } from "web-loading/src/types.d";
// 1.引入基础model
import BaseModel from "web-loading/src/draw/model/BaseModel";
// 2?.如果model中options需要自定义参数，定义options类型
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
        this.ctx.fillRect(-op.size / 2, -op.size / 2, op.size, op.size)
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
import initLoading from 'web-loading/src/loading'
let dom:HtmlElement = document.querySelector('xxx')
// 4.配置自定义的options参数
let options: CustomOptionsType = {
  // 4.1.配置custom后优先级大于model
  custom: CustomLoading,
  // 4.2.配置自定义参数
  size: 10,
};
let webLoading:LoadingType = initLoading(options)
webLoading.loading(dom)
```

### `BaseModel`参数

> `WebLoading`调用`custom`的时候会自动注入相关参数。

| 参数      | 类型                          | 备注                                                         |
| --------- | ----------------------------- | ------------------------------------------------------------ |
| `w`       | `number`                      | 画布宽度                                                     |
| `h`       | `number`                      | 画布高度                                                     |
| `canvas`  | `HTMLCanvasElement`           | 画布元素，`BaseModel`默认以及获取了`2d`的上下文，但您还可以根据画布元素获取其他上下文 |
| `options` | `Required<CustomOptionsType>` | `options`是调节**model**参数，分为有**公共**参数与**model**参数最终会合并，`Required`标注你的参数不为空(已经初始值) |
| `store`   | `ElementStoreType`            | [`ElementStoreType`](#store-elment-elementtype)              |

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
            // 如果触发也可以强制修改
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

### 动态的options

> 无论是初始化还是在`run`函数中，修改`options`都是实时动态的，以此可以控制`requestAnimationFrame`触发的延迟时间不那么规律。

```typescript
this.run(()=>{
    // 动态修改delay会影响run函数的触发
    this.options.delay = 10
})
```

### `BaseModel`自定义例子

> 这里方便使用原生html，所采用全局引入方式。
@[code](./custom.html)
> 这里自定义了一个，`CustomLoading model`， 获取倒`size`参数后，在`run`函数中每一帧绘制了一个Rect矩形，`defOptions` 是自定义model的默认`options`值，当前`init`时也可以修改

## html配置方式

> 只是注入方式不同，操作方式一致。

### 初始化

```ts
import initLoading from 'web-loading/src/loading'
let webLoading = initLoading({
    html:`<div class="spinner">
    <svg viewBox="25 25 50 50" class="circular">
        <circle stroke-miterlimit="10" stroke-width="3" fill="none" r="20" cy="50" cx="50" class="path"></circle>
    </svg>
</div>`
})
```

> **html**优先级大于**custom**。

### css动画

```css
.spinner {
  --red: #d62d20;
  --blue: #0057e7;
  --green: #008744;
  --yellow: #ffa700;
  position: relative;
  width: 60px;
}

.spinner:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.circular {
  animation: rotate73451 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash0175 1.5s ease-in-out infinite, color7123 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes rotate73451 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash0175 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

@keyframes color7123 {
  100%, 0% {
    stroke: var(--red);
  }

  40% {
    stroke: var(--blue);
  }

  66% {
    stroke: var(--green);
  }

  80%, 90% {
    stroke: var(--yellow);
  }
}
```

> class命名尽量隔绝外部元素。

