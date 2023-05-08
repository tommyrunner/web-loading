# use

> The use here takes the introduction separately as an example,[Global introduction](../guide/#global-introduction)Use similar.

## `WebLoading`

> Whether it is `DOM`, `FULL `or `MINI `, it will eventually go to `WebLoading`.

```typescript
import { LoadingType } from "web-loading/src/types.d";
import initLoading from 'web-loading/src/loading'
let webLoading:LoadingType = initLoading({})
console.log(webLoading)
```

> `LoadingType`：`loading`、`resize`、`close`、`update`、`getOptions`、`getLoadingId`。

### loading

> Start the animation`loading`。

+ Parameters:
  + `dom:HTMLElement`
  + `options?:OptionsType`

+ Return: void

> When the `loading` function is called, it will first check whether the `loadingId` exists (whether it is still being drawn). Only when there is no drawing status can it be started.
>
> The `loading` parameter 2 can override the `options` of the initialization `initLoading `.

### resize

> Recalculate and draw the `loading` size.

+ Parameter: None
+ Return: void

> `Resize`will retrieve the size and redraw from the bound` HtmlElement `. This function will not re-instance` WebLoading `and` loading `business scenarios. For example,` window. addEventListener (`resize`, loading. resize) `may be used.

### close

> close`loading。`

+ Parameter: None
+ Return: void

>`close` will first clear all `stores` and other records of` WebLoading `, and stop the` requestAnimationFrame `call, and finally clear the relevant elements according to` delayInto `. During the closing process,` WebLoading `will use` hookCall `to trigger the` hook `to close **hook function** (` BEFORE _COLSE `: before closing,` COLSED `: after closing, that is, after clearing the elements) to facilitate the drawing of **model**.

### update

> Draw `model` dynamically. [Public Configuration](#Public) cannot be modified dynamically.

+ Parameter:
  + `options?:OptionsType`
+ Return:void

> The update function does not re-instance `WebLoading`, and re-draws` model `through the parameter` options`. The business scenario is similar to `loading`, but `loading` initializes` WebLoading `every time. Only when it is closed can the corresponding business be implemented. Therefore,` update `is recommended in the dynamic rendering` model `business scenario.

### getOptions

> Get the current options configuration.

+ Parameter: None

+ Return:
  + `options:OptionsType`

### getLoadingId

> obtain `loadingId`。

+ Parameter: None

+ Return:
  + `loadingId:string | null`

> The `loadingId `will be assigned a value after initialization, and will be assigned a value of` null `after` close `is closed. Therefore, if` loadingId `is` null`, there is currently no drawing status, otherwise the opposite is true.

## options

```typescript
import { MODEL_TYPES } from "web-loading/src/utils";
import initLoading from 'web-loading/src/loading'
let webLoading = initLoading({
    model:MODEL_TYPES.GEAR
})
```

### Public

| attribute              | type                          | default                 | remarks                            |
| ----------------- | ----------------------------- | ---------------------- | ------------------------------- |
| `html?:` | `string` | `''` | **Html ** loading method (**priority is higher than custom**) |
| `custom?:`        | `typeof BaseModel or null`                         | `null`                 | Custom **model** (**has the highest priority**) |
| `type?:`          | `LOADING_TYPES`               | `LOADING_TYPES.DOM`    | Start mode                        |
| `miniClass?:`     | `string or null or undefined` | `mini`                 | Start by**MINI**is**class** |
| `model?:`         | `MODEL_TYPES`                 | `MODEL_TYPES.RING`     | Model module                       |
| `text?:`          | `string`                      | `加载中...`            | Font content                        |
| `textGap?:`       | `number`                      | `8`                    | Font spacing                        |
| `fontSize?:`      | `number`                      | `12`                   | Font size                        |
| `fontFamily?:`    | `string`                      | `Microsoft YaHei`      | Font type                        |
| `delay?:`         | `number`                      | `65`                   | Animation delay                        |
| `delayInto?:`    | `number`                      | `520`                  | Turn off animation delay                    |
| `optimization?:`  | `boolean`                     | `false`                | Optimization processing (not supported temporarily)            |
| `zIndex?:`        | `string`                      | `2001`                 | Loading level                     |
| `themeColor?:`    | `string`                      | `rgba(64,158,255,1)`   | Theme color                          |
| `bgColor?:`       | `string`                      | `rgba(0, 0, 0, 0.8)`   | Background color                          |
| `shadowColor?:`   | `string`                      | `rgba(64,158,255,0.6)` | Shadow color                          |
| `shadowOffsetX?:` | `number`                      | `2`                    | Shadow X                           |
| `shadowOffsetY?:` | `number`                      | `2`                    | Shadow Y                           |
| `shadowBlur?:`    | `number`                      | `5`                    | Shadow range                        |
| `pointerEvents?:` | `boolean`                     | `false`                | Event penetration(**DOM**model)           |
| `toast?:`         | `boolean`                     | `true`                | Whether to display a prompt           |

+ LOADING_TYPES

| attribute | enum | remarks   |
| ---- | ------ | ------ |
| DOM  | `dom`  | Element   |
| FULL | `full` | Full screen   |
| MINI | `mini` | Mobile terminal |

+ MODEL_TYPES

[Supported models](./model.html#supported-models)

### model

[Model configuration details](./model.md)

## custom model

### TypeScript Item Example

+ custom

```typescript
import type { OptionsType, LimitType, ElementType } from "web-loading/src/types.d";
import BaseModel from "web-loading/src/draw/model/BaseModel";
// 1?.If options in the model need custom parameters, define options type
interface CustomOptionsType extends OptionsType {
  size?: number;
}
// 2?.Customize the default parameters of the model (if you do not need to customize the options parameter, you can use OptionsType)
// 2.1?. Define default values
let modelDefOptions: CustomOptionsType = {
  size: 10,
};
// 2.2?.Size of limit value
let limits: Array<LimitType> = [
  {
    key: "size",
    message: "key < 100",
    limit: (key) => {
      return key < 100;
    },
  },
];
// 3.Custom model class
class CustomLoading extends BaseModel<CustomOptionsType> {
  constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<CustomOptionsType>, element: ElementType) {
   super(w, h, canvas, options, element, modelDefOptions, limits, function modelDefCall(model) {
      //BaseModel initialization success callback (you can do some special initialization operations yourself)
      //The model is CustomLoading itself. Here, the initialization default brush fill is red
      model.ctx.fillStyle = "red";
    });
    // 根据周期调用
    this.run(this.draw);
  }
  draw() {
    // Empty the canvas
    this.clearRect();
    let op = this.options;
    // Draw (get the configured custom options parameter here)
    this.ctx.fillRect(-op.size / 2, -op.size / 2, op.size, op.size);
  }
}
```

> Here is a simple custom drawing of a rectangle 
> + `BaseModel` is a user-defined inheritance class. If it is introduced globally, the `BaseModel` attribute is mounted in the `window`. 
> + Note: `modelDefOptions`,` limits`, `modelDefCall` are not required parameters 
> + Here, if the customized **model** does not need the `options` parameter, you can omit the **1、2** steps.

+ loading

```typescript
import { LoadingType } from "web-loading/src/types.d";
import initLoading from "web-loading/src/loading";
let dom = document.querySelector("xxx");
// configuration parameter
let options: CustomOptionsType = {
  custom: CustomLoading as typeof BaseModel,
  size: 20,
};
let webLoading: LoadingType = initLoading(options);
webLoading.loading(dom);
```

### Native html project example

@[code](./custom.html)

### 1、`BaseModel`parameter

> `WebLoading `will automatically inject relevant parameters when calling` custom `.

| parameter      | type                          | remarks                                                         |
| --------- | ----------------------------- | ------------------------------------------------------------ |
| `w`       | `number`                      | Canvas Width                                                     |
| `h`       | `number`                      | Canvas height                                                     |
| `canvas`  | `HTMLCanvasElement`           | Canvas element, `BaseModel` default and get the context of `2d`, but you can also get other contexts according to the canvas element |
| `options` | `Required<CustomOptionsType>` | `Options` is to adjust **model** parameters, which are divided into **public** parameters and **model** parameters, which will be merged eventually, and `Required` indicates you The parameter of is not empty (has initial value) |
| `element`   | [`ElementType`](#elementtype)             | Container element              |
| `modelDefOptions?:`   | `T`            | Custom default parameters for **model**(optional)           |
| `limits?:`   | [`Array<LimitType>`](#limittype)             | Custom **model**'s' options 'value restriction function (optional)           |
| `modelDefCall?:`   | `(model: BaseModel<T>) => void`            | `BaseModel` initialization completion callback (optional)             |

### `ElementType`

> Inherited`HTMLElement`。

| attribute                 | type               | remarks    |
| -------------------- | ------------------ | ------- |
| `loadingId`          | `string or null`      | Record `loading` element `id`  |
| `$store`             | [`ElementStoreType`](#elementtype-store-elementstoretype) | `loding` cache content |
| `HTMLElement attribute...` | ...                | ...     |


### `ElementType.$store:ElementStoreType`

> When drawing **model**, you need to use some **states** of `WebLoading`.

| attribute        | type                        | remarks                      |
| ------------- | ----------------------------- | --------------------------- |
| `options`     | `OptionsType`                 | Save the final merged `options` parameter |
| `animationId` | `number or undefined`           | Record `animation` status       |
| `loadingId`   | `string or null`                 | Record `loading` element `id`   |
| `hookCall`    | `HooksCallType`               | Hook function of `loading `       |
| `model`       | `BaseModel or null` | **model** in use       |
### `ElementType.$store.hookCall:HooksCallType`

> `WebLoading`The hook function triggered when closing.
>
> `HOOKSCALL_KEY`Enumeration.

| attribute           | enum        | type       | remarks               |
| -------------- | ------------- | ---------- | ------------------ |
| `BEFORE_COLSE` | `beforeColse` | `Function` | Before closing             |
| `COLSED`       | `colsed`      | `Function` | After closing (after deleting elements) |

Take `custom` as an example

```typescript
// Other codes are omitted
class CustomLoading extends BaseModel<CustomOptionsType> {
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<CustomOptionsType>, element: ElementType) {
        super(w, h, canvas, options, element);
        this.initOptions(defOptions);
        this.run(this.draw);
        this.store.hookCall.beforeColse(() => {
            console.log("Before closing");
        });
        this.store.hookCall.colsed(() => {
            console.log("After closing");
        });
    }
    draw() {
        let op = this.options;
        this.ctx.fillRect(0, 0, op.size, op.size);
    }
}
```

### `LimitType`

> Limit the range of `options` parameter values.

| attribute        | type                        | remarks                      |
| ------------- | ----------------------------- | --------------------------- |
| `key`     | `string`                 | The `options` attribute that needs to be restricted |
| `message` | `string`           | Prompt for exceeding the limit       |
| `limit` | `(key: any) => boolean`           | Restricted operation       |

### 2、`BaseModel` function

> `BaseModel`The built-in function is mainly for user **extension model** rendering

| function                  | return   | remarks   |
| --------------------- | ------ | ------ |
| `initContextCall`                 | `void` | [initContextCall](#basemodel-initcontextcall)  |
| `run`                 | `void` | [run](#basemodel-run)  |
| `clearRect`           | `void` | [clearRect](#basemodel-clearrect)  |
| `drowRadiusRect`      | `void` | [drowRadiusRect](#basemodel-drowradiusrect)  |
| `drawText`      | `void` | [drawText](#basemodel-drawtext)  |
| `clearAnimationFrame` | `void` | [clearAnimationFrame](#basemodel-clearanimationframe)  |

### `BaseModel:initContextCall`

> `BaseModel ` Initialize the custom canvas property (triggered during inheritance).

| 参数  | 类型       | 备注                                       |
| ----- | ---------- | ------------------------------------------ |
| `modelDefOptions?:` | `T` | Customize the default `options` value of **model**. |
| `limits?:` | `Array<LimitType>` | Customize the limit range of the `options` value of **model**. |
| `modelDefCall?:` | `BaseModel<T>` | `BaseModel ` initialization completion callback. |

### `BaseModel:run`

> The `requestAnimationFrame` is delayed according to the `options.delay`.

| parameter  | type       | remarks                                       |
| ----- | ---------- | ------------------------------------------ |
| `fun` | `Function` | If it is loading before calling, the last state will be cleared. |

```typescript
this.run(()=>{
    // Triggered according to options.delay
})
```

### `BaseModel:clearRect`

> Empty the canvas.

| parameter    | type     | remarks                                           |
| ------- | -------- | ---------------------------------------------- |
| `x?:`   | `number` | Empty starting point X                                      |
| `y?:`   | `number` | Empty starting point Y                                    |
| `w_r?:` | `number` | Empty end X (width), in case of circular emptying `w_ R` is **radius** |
| `h?:`   | `number` | Empty end Y (height)                                |

+ Empty all

```typescript
this.clearRect()
```

> Considering that the drawing area may exceed the default width and height, emptying all will empty **twice** the width and height.

+ Custom Emptying

```typescript
this.clearRect(0,0,100,100)
```

> Emptying starts at the coordinates of `x=0, y=0` and ends at `x=100, y=100`.

+ Empty circular area

```js
this.clearRect(0,0,10)
```

> Empty the area with `x=0, y=0` and radius of `10`.

### `BaseModel:drowRadiusRect`

> Draw a rectangle with rounded corners.

| parameter | type     | remarks        |
| ---- | -------- | ----------- |
| `x`  | `number` | Start X       |
| `y`  | `number` | Start Y       |
| `w`  | `number` | End X (width) |
| `h`  | `number` | End Y (height) |

```typescript
this.drowRadiusRect(0, 0, 100, 100, 10)
// Need to draw by yourself
this.ctx.fill()
```

> Draw a rectangle with `x=0, y=0` width and height of `100` and rounded corners of `10`.

### `BaseModel:drawText`

> Draw default text.

| parameter | type     | remarks        |
| ---- | -------- | ----------- |
| `params?:`  | [`DrawTextParamsType`](#basemodel-drawtext-drawtextparamstype) | Draw text parameters       |
### `BaseModel:drawText.DrawTextParamsType`

| parameter | type     | default        | remarks        |
| ---- | -------- | -------- | ----------- |
| `esGap`  | `number` | `0`  | Extra text gap (textGap+fontSize)      |
| `x`  | `number`  | `0` | X-axis       |
| `text`  | `string`  | `加载中...` | text |
| `textColor`  | `string`  | `rgba(64,158,255,1)` | text color |

```typescript
this.drawText()
```

### `BaseModel:clearAnimationFrame`

> Empty (stop)`requestAnimationFrame`。

| parameter | type     | remarks          |
| ---- | -------- | ------------- |
| `id` | `number` | `animationId` |

```typescript
this.clearAnimationFrame(element.$store.animationId)
```

> The ID passed in is `id` returned by `requestAnimationFrame` , and  `WebLoading` has been saved in the store.


### 3、`BaseModel` technique
### Dynamic options

> Whether it is initialization or in the `run` function, modifying `options` is real-time and dynamic, which can control the delay time triggered by` requestAnimationFrame `to be irregular.

```typescript
this.run(()=>{
    // Dynamic modification of delay will affect the trigger of run function
    this.options.delay = 10
})
```

## Html configuration method

> Add **html** configuration to `options`, which has priority over **model** and `custom`.

### initialization

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

> **Html** priority is higher than **custom**.

### Css animation

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

> The class naming should try to isolate external elements.
