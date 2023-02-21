# model

> model 配置最终会和[公共配置](./use.html#公共)合并。

## 支持的 model

> 如果设置了`custom`优先级大于**model**，枚举`MODEL_TYPES`。

| model    | 枚举值     | 备注     |
| -------- | ---------- | -------- |
| GEAR     | `Gear`     | 齿轮旋转 |
| RING     | `Ring`     | 环形旋转 |
| ZOOM     | `Zoom`     | 图形变形 |
| PATTERN  | `Pattern`  | 多图形   |
| CLOCK    | `Clock`    | 时钟     |
| BEAN     | `Bean`     | 吃豆人   |
| ROLL     | `Roll`     | 翻滚     |
| CIRCULAR | `Circular` | 碰       |
| IMG      | `Img`      | 图片     |
| SKELETON | `Skeleton` | 骨架屏   |

## GEAR

> 类型`GearOptionsType`。

| 属性            | 类型            | 默认值  | 限制  | 备注                    |
| --------------- | --------------- | ------- | ----- | ----------------------- |
| `lineStart`     | `number`        | `10`    |       | 线端                    |
| `lineEnd`       | `number`        | `16`    |       | 线末                    |
| `lineStartSkew` | `number`        | `0`     |       | 线端偏移度              |
| `lineEndSkew`   | `number`        | `0`     |       | 线末偏移度              |
| `lineWidth`     | `number`        | `4`     |       | 线宽度                  |
| `lineCap`       | `CanvasLineCap` | `round` |       | 线的样式                |
| `lineNum`       | `number`        | `10`    | [4-8] | 线数量                  |
| `direction`     | `boolean`       | `true`  |       | x 旋转方向:true:顺,则反 |

> 为了更好的控制`Gear`的**size**，设置`lineStart`与`lineEnd`来控制半径或者大小。

## RING

> 类型`RingOptionsType`。

| 属性        | 类型            | 默认值                   | 限制            | 备注              |
| ----------- | --------------- | ------------------------ | --------------- | ----------------- |
| `arcGap`    | `number`        | `Math.PI / 4`            |                 | 环与环空隙        |
| `ringGap`   | `number`        | `10`                     |                 | 弧线之间间隔      |
| `lineWidth` | `number`        | `2`                      |                 | 线宽度            |
| `ringNum`   | `number`        | `2`                      | [1-10]          | 环数量            |
| `radius`    | `number`        | `6`                      |                 | 环半径            |
| `lineCap`   | `CanvasLineCap` | `round`                  |                 | 线的样式          |
| `turn`      | `number`        | `10`                     |                 | 旋转角度          |
| `ringsTurn` | `Array<number>` | `[Math.PI, Math.PI / 4]` | length<=ringNum | 多个环初始角度    |
| `direction` | `boolean`       | `true`                   |                 | 方向:true:顺,则反 |

## ZOOM

> 类型`ZoomOptionsType`。

| 属性         | 类型            | 默认值              | 限制        | 备注              |
| ------------ | --------------- | ------------------- | ----------- | ----------------- |
| `maxSize`    | `number`        | `16`                | >=lineWidth | zoom 变化最大     |
| `zoomGap`    | `number`        | `10`                |             | zomm 距离         |
| `zoomHeight` | `number`        | `2`                 |             | zomm 的高度       |
| `zoomNum`    | `number`        | `5`                 |             | zoom 数量         |
| `zoomColors` | `Array<string>` | `[]`                |             | zoom 的自定义颜色 |
| `lineCap`    | `CanvasLineCap` | `round`             |             | 线的样式          |
| `lineWidth`  | `number`        | `10`                | <=maxSize   | 线宽度            |
| `action`     | `ZOOM_ACTION`   | `ZOOM_ACTION.SCALE` |             | 动作              |
| `direction`  | `boolean`       | `true`              |             | 方向:true:顺,则反 |

### ZOOM.action

> 枚举`ZOOM_ACTION`。

| 属性   | 枚举值   | 备注     |
| ------ | -------- | -------- |
| SCALE  | `scale`  | 大小变化 |
| WAVE   | `wave`   | 波浪     |
| HEIGHT | `height` | 高度变化 |

## PATTERN

> 类型`PatternOptionsType`，此模块`delay`不能被修改。

| 属性          | 类型                   | 默认值                                                                                                        | 限制   | 备注       |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- | ------ | ---------- |
| `charts`      | `Array<PATTERN_CHART>` | `[PATTERN_CHART.ARC, PATTERN_CHART.RECT, PATTERN_CHART.TRIANGLE, PATTERN_CHART.HEART, PATTERN_CHART.POLYGON]` |        | 支持的图形 |
| `chartSize`   | `number`               | `12`                                                                                                          | [5-24] | 图形大小   |
| `chartColors` | `Array<string>`        | `['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd']`                                                     |        | 动态颜色   |
| `maxHeight`   | `number`               | `60`                                                                                                          |        | 高度       |

### PATTERN.charts

> 枚举`PATTERN_CHART`。

| 属性     | 枚举值     | 备注   |
| -------- | ---------- | ------ |
| RECT     | `rect`     | 矩形   |
| ARC      | `arc`      | 圆形   |
| TRIANGLE | `triangle` | 三角形 |
| HEART    | `heart`    | 爱心   |
| POLYGON  | `polygon`  | 多边形 |

## CLOCK

> 类型`ClockOptionsType`。

| 属性         | 类型                | 默认值                              | 限制      | 备注                            |
| ------------ | ------------------- | ----------------------------------- | --------- | ------------------------------- |
| `textTime`   | `'time'或's'  或''` | `''`                                |           | 文字显示模式:time:年月日，s：秒 |
| `lineColors` | `Array<string>`     | `['#d4d4d4', '#06ab2d', '#8a0303']` | length<=3 | 指针颜色                        |
| `lineCap`    | `CanvasLineCap`     | `round`                             |           | 线的样式                        |
| `lineWidth`  | `number`            | `12`                                |           | 线宽度                          |
| `clockSize`  | `number`            | 15                                  |           | clock 大小                      |
| `clockGap`   | `number`            | 4                                   |           | clock 空隙                      |
| `hLine`      | `boolean`           | true                                |           | 时指针显示                      |
| `mLine`      | `boolean`           | false                               |           | 分指针显示                      |
| `sLine`      | `boolean`           | true                                |           | 秒指针显示                      |

## BEAN

> 类型`BeanOptionsType`。

| 属性          | 类型       | 默认值 | 限制 | 备注                 |
| ------------- | ---------- | ------ | ---- | -------------------- |
| `beanSize`    | `'number'` | `15`   | >=5  | bean 的大小          |
| `pointLength` | `number`   | `16`   | >=5  | bean 里的 point 数量 |

## ROLL

> 类型`RollOptionsType`，此模块`delay`不能被修改。

| 属性                 | 类型            | 默认值                                         | 限制      | 备注                            |
| -------------------- | --------------- | ---------------------------------------------- | --------- | ------------------------------- |
| `rollSize`           | `number`        | `16`                                           | length<=3 | roll 大小                       |
| `showChild`          | `boolean`       | `true`                                         |           | 显示影子 child                  |
| `childNum`           | `number`        | `4`                                            | [4-10]    | child 影子数量                  |
| `rollGap`            | `number`        | `12`                                           |           | 影子空隙                        |
| `chart`              | `ROLL_CHART`    | `ROLL_CHART.WHEEL`                             |           | 显示的图形                      |
| `windmills`          | `Array<string>` | `['#1ab3ea', '#de6834', '#30925d', '#f48ea5']` |           | 图形为 Windmills 的叶片颜色。   |
| `windmillPointColor` | `string`        | `#f2c31f`                                      |           | 图形为 Windmills 时中间点颜色。 |
| `fixad`              | `boolean`       | `false`                                        |           | 是否中心固定                    |

### ROLL.chart

> 枚举`ROLL_CHART`。

| 属性     | 枚举值     | 备注 |
| -------- | ---------- | ---- |
| RECT     | `rect`     | 矩形 |
| WHEEL    | `wheel`    | 轮子 |
| WINDMILL | `windmill` | 风车 |

## Circular

> 类型`CircularOptionsType`。

| 属性        | 类型              | 默认值                                         | 备注           |
| ----------- | ----------------- | ---------------------------------------------- | -------------- |
| `arcSize`   | `number`          | `8`                                            | 圆大小         |
| `arcGap`    | `number`          | `2`                                            | 圆空隙         |
| `arcColors` | `Array<string>`   | `['#ec7546', '#8364a4', '#ff6c6e', '#5bc6ab']` | 圆的自定义颜色 |
| `action`    | `CIRCULAR_ACTION` | `CIRCULAR_ACTION.COLLISION`                    | 动作           |

### Circular.action

> 枚举`CIRCULAR_ACTION`。

| 属性      | 枚举值      | 备注 |
| --------- | ----------- | ---- |
| COLLISION | `Collision` | 移动 |
| ROTATE    | `rotate`    | 旋转 |

## IMG

> 类型`ImageOptionsType`。

| 属性     | 类型      | 默认值             | 备注     |
| -------- | --------- | ------------------ | -------- |
| `src`    | `string`  | WebLoading 的 logo | 图片链接 |
| `width`  | `number`  | `52`               | 图片宽度 |
| `height` | `number`  | `52`               | 图片高度 |
| `turn`   | `boolean` | `true`             | 是否旋转 |

> `Img`是创建了一个`HTMLImageElement`，所以使用`src`兼容与它。

## SKELETON

> 类型`SkeletonOptionsType`。
>
> `Skeleton` 不会给内嵌文本生成骨架。

| 属性                     | 类型      | 默认值               | 备注              |
| ------------------------ | --------- | -------------------- | ----------------- |
| `skeletonColor`          | `string`  | `rgb(240, 240, 240)` | skeleton 默认颜色 |
| `skeletonAnimationColor` | `string`  | `rgb(226, 226, 226)` | skeleton 动画颜色 |
| `radius`                 | `number`  | `5`                  | skeleton 圆角     |
| `animation`              | `boolean` | `true`               | 显示动画          |
| `deep`                   | `boolean` | `true`               | 深度 skeleton     |
| `appoint`                | `string`  | `''`                 | 指定元素 skeleton |

### SKELETON 上拉加载例子

> 业务场景：功能是**指定某些元素**，显示骨架，比如上拉加载，只需要动态显示最后一个或多个模块元素显示骨架，此时推荐指定元素。
> @[code](./SKELETON.html)
> 这里使用原生 html 方式引入，并显示，其余 web 框架同理。这里用的是**元素分隔**的方式，当然也可以使用`appoint`指定元素实现。

## 涉及到的 HTEMLElment 类型

### CanvasLineCap

| 属性   | 类型   | 备注 |
| ------ | ------ | ---- |
| butt   | string |      |
| round  | string |      |
| square | string |      |
