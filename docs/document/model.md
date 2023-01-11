# model

> model配置最终会和[公共配置](./use.html#公共)合并。

## 支持的model

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
| IMG      | `Img`      | 图片     |
| SKELETON | `Skeleton` | 骨架屏   |

## GEAR

> 类型`GearOptionsType`。

| 属性            | 类型            | 默认值  | 限制  | 备注                   |
| --------------- | --------------- | ------- | ----- | ---------------------- |
| `lineStart`     | `number`        | `10`    |       | 线端                   |
| `lineEnd`       | `number`        | `16`    |       | 线末                   |
| `lineStartSkew` | `number`        | `0`     |       | 线端偏移度             |
| `lineEndSkew`   | `number`        | `0`     |       | 线末偏移度             |
| `lineWidth`     | `number`        | `4`     |       | 线宽度                 |
| `lineCap`       | `CanvasLineCap` | `round` |       | 线的样式               |
| `lineNum`       | `number`        | `10`    | [4-8] | 线数量                 |
| `direction`     | `boolean`       | `true`  |       | x旋转方向:true:顺,则反 |

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
| `maxSize`    | `number`        | `16`                | >=lineWidth | zoom变化最大      |
| `zoomGap`    | `number`        | `10`                |             | zomm距离          |
| `zoomHeight` | `number`        | `2`                 |             | zomm的高度        |
| `zoomNum`    | `number`        | `5`                 |             | zoom数量          |
| `zoomColors` | `Array<string>` | `[]`                |             | zoom的自定义颜色  |
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

| 属性          | 类型                   | 默认值                                                       | 限制   | 备注         |
| ------------- | ---------------------- | ------------------------------------------------------------ | ------ | ------------ |
| `charts`      | `Array<PATTERN_CHART>` | `[PATTERN_CHART.ARC, PATTERN_CHART.RECT, PATTERN_CHART.TRIANGLE, PATTERN_CHART.HEART, PATTERN_CHART.POLYGON]` |        | zoom变化最大 |
| `chartColors` | `number`               | `['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd']`    | [5-24] | zomm距离     |
| `chartSize`   | `Array<string>`        | `60`                                                         |        | zomm的高度   |
| `maxHeight`   | `number`               | `12`                                                         |        | zoom数量     |

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
| `lineCap`    | `Array<string>`     | `round`                             |           | 线的样式                        |
| `lineWidth`  | `number`            | `12`                                |           | 线宽度                          |
| `clockSize`  | `number`            | 15                                  |           | clock大小                       |
| `clockGap`   | `number`            | 4                                   |           | clock 空隙                      |
| `hLine`      | `boolean`           | true                                |           | 时指针显示                      |
| `mLine`      | `boolean`           | false                               |           | 分指针显示                      |
| `sLine`      | `boolean`           | true                                |           | 秒指针显示                      |

## BEAN

> 类型`BeanOptionsType`。

| 属性          | 类型       | 默认值 | 限制 | 备注              |
| ------------- | ---------- | ------ | ---- | ----------------- |
| `beanSize`    | `'number'` | `15`   | >=5  | bean的大小        |
| `pointLength` | `number`   | `16`   | >=5  | bean里的point数量 |

## ROLL

> 类型`RollOptionsType`，此模块`delay`不能被修改。

| 属性                 | 类型            | 默认值                                         | 限制      | 备注                            |
| -------------------- | --------------- | ---------------------------------------------- | --------- | ------------------------------- |
| `rollGap`            | `number`        | `12`                                           |           | Roll直接空隙                    |
| `rollSize`           | `number`        | `16`                                           | length<=3 | roll大小                        |
| `showChild`          | `boolean`       | `true`                                         |           | 显示影子child                   |
| `childNum`           | `number`        | `4`                                            | [4-10]    | child影子数量                   |
| `chart`              | `ROLL_CHART`    | `ROLL_CHART.WHEEL`                             |           | 显示的图形                      |
| `windmills`          | `Array<string>` | `['#1ab3ea', '#de6834', '#30925d', '#f48ea5']` |           | 图形为Windmills时的叶片颜色。   |
| `windmillPointColor` | `string`        | `#f2c31f`                                      |           | 图形为Windmills时的中间点颜色。 |
| `fixad`              | `boolean`       | `false`                                        |           | 是否中心固定                    |

### ROLL.chart

> 枚举`ROLL_CHART`。

| 属性     | 枚举值     | 备注 |
| -------- | ---------- | ---- |
| RECT     | `rect`     | 矩形 |
| WHEEL    | `wheel`    | 轮子 |
| WINDMILL | `windmill` | 风车 |

## IMG

> 类型`ImageOptionsType`。

| 属性     | 类型      | 默认值           | 备注     |
| -------- | --------- | ---------------- | -------- |
| `src`    | `string`  | WebLoading的logo | 图片链接 |
| `width`  | `number`  | `52`             | 图片宽度 |
| `height` | `number`  | `52`             | 图片高度 |
| `turn`   | `boolean` | `true`           | 是否旋转 |

> `Img`是创建了一个`HTMLImageElement`，所以使用`src`兼容与它。

## SKELETON

> 类型`SkeletonOptionsType`。

| 属性                     | 类型      | 默认值               | 备注             |
| ------------------------ | --------- | -------------------- | ---------------- |
| `skeletonColor`          | `string`  | `rgb(240, 240, 240)` | skeleton默认颜色 |
| `skeletonAnimationColor` | `string`  | `rgb(226, 226, 226)` | skeleton动画颜色 |
| `radius`                 | `number`  | `5`                  | skeleton圆角     |
| `animation`              | `boolean` | `true`               | 显示动画         |
| `deep`                   | `boolean` | `true`               | 深度skeleton     |
| `appoint`                | `string`  | `''`                 | 指定元素skeleton |

### SKELETON例子

[暂无]

## 涉及到的HTEMLElment类型

### CanvasLineCap

| 属性   | 类型   | 备注 |
| ------ | ------ | ---- |
| butt   | string |      |
| round  | string |      |
| square | string |      |

