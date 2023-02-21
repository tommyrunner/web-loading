# model

> The model configuration will eventually be merged with [public configuration](./use.html#public).

## Supported models

> If the `custom` priority is set to be greater than **model**, enumerate `MODEL_ TYPES`。

| model    | enum     | remarks     |
| -------- | ---------- | -------- |
| GEAR     | `Gear`     | Gear rotation |
| RING     | `Ring`     | Circular rotation |
| ZOOM     | `Zoom`     | Shape deformation |
| PATTERN  | `Pattern`  | Multigraph   |
| CLOCK    | `Clock`    | Clock     |
| BEAN     | `Bean`     | Pac-Man   |
| ROLL     | `Roll`     | roll     |
| CIRCULAR | `Circular` | Circular       |
| IMG      | `Img`      | image     |
| SKELETON | `Skeleton` | Skeleton   |

## GEAR

> type `GearOptionsType`。

| attribute            | type            | Default  | limit  | remarks                   |
| --------------- | --------------- | ------- | ----- | ---------------------- |
| `lineStart`     | `number`        | `10`    |       | Line end                   |
| `lineEnd`       | `number`        | `16`    |       | End of line                   |
| `lineStartSkew` | `number`        | `0`     |       | Line end Offset             |
| `lineEndSkew`   | `number`        | `0`     |       | End of line Offset             |
| `lineWidth`     | `number`        | `4`     |       | Linewidth                 |
| `lineCap`       | `CanvasLineCap` | `round` |       | Line style               |
| `lineNum`       | `number`        | `10`    | [4-8] | Number of lines                 |
| `direction`     | `boolean`       | `true`  |       | X Rotation direction: true: clockwise, then reverse|

> To better control the **size** of `Gear`, set `lineStart` and `lineEnd` to control the radius or size.

## RING

> type `RingOptionsType`。

| attribute        | type            | Default                   | limit            | remarks              |
| ----------- | --------------- | ------------------------ | --------------- | ----------------- |
| `arcGap`    | `number`        | `Math.PI / 4`            |                 | Ring to ring gap        |
| `ringGap`   | `number`        | `10`                     |                 | Interval between arcs      |
| `lineWidth` | `number`        | `2`                      |                 | Linewidth            |
| `ringNum`   | `number`        | `2`                      | [1-10]          | Number of rings            |
| `radius`    | `number`        | `6`                      |                 | Ring radius            |
| `lineCap`   | `CanvasLineCap` | `round`                  |                 | Line style          |
| `turn`      | `number`        | `10`                     |                 | Rotation angle          |
| `ringsTurn` | `Array<number>` | `[Math.PI, Math.PI / 4]` | length<=ringNum | Initial angle of multiple rings    |
| `direction` | `boolean`       | `true`                   |                 | Direction: true: positive, then negative |

## ZOOM

> type`ZoomOptionsType`。

| attribute         | type            | Default              | limit        | remarks              |
| ------------ | --------------- | ------------------- | ----------- | ----------------- |
| `maxSize`    | `number`        | `16`                | >=lineWidth | zoom Maximum variation      |
| `zoomGap`    | `number`        | `10`                |             | zomm distance          |
| `zoomHeight` | `number`        | `2`                 |             | zomm Height of        |
| `zoomNum`    | `number`        | `5`                 |             | zoom quantity          |
| `zoomColors` | `Array<string>` | `[]`                |             | zoom Custom colors for |
| `lineCap`    | `CanvasLineCap` | `round`             |             | Line style          |
| `lineWidth`  | `number`        | `10`                | <=maxSize   | Linewidth            |
| `action`     | `ZOOM_ACTION`   | `ZOOM_ACTION.SCALE` |             | action              |
| `direction`  | `boolean`       | `true`              |             | Direction: true: positive, then negative |

### ZOOM.action

> enumeration `ZOOM_ACTION`。

| attribute   | enum   | remarks     |
| ------ | -------- | -------- |
| SCALE  | `scale`  | Size change |
| WAVE   | `wave`   | wave     |
| HEIGHT | `height` | Height change |

## PATTERN

> Type `PatternOptionsType`, this module `delay` cannot be modified.

| attribute          | type                   | Default                                                       | limit   | remarks         |
| ------------- | ---------------------- | ------------------------------------------------------------ | ------ | ------------ |
| `charts`      | `Array<PATTERN_CHART>` | `[PATTERN_CHART.ARC, PATTERN_CHART.RECT, PATTERN_CHART.TRIANGLE, PATTERN_CHART.HEART, PATTERN_CHART.POLYGON]` |        | Supported graphics |
| `chartSize` | `number`               | `12`    | [5-24] | largeness of the shape of the figure     |
| `chartColors`   | `Array<string>`        | `['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd']`                                                         |        | Dynamic color   |
| `maxHeight`   | `number`               | `60`                                                         |        | height     |

### PATTERN.charts

> enumeration `PATTERN_CHART`。

| attribute     | enum     | remarks   |
| -------- | ---------- | ------ |
| RECT     | `rect`     | rect   |
| ARC      | `arc`      | arc   |
| TRIANGLE | `triangle` | triangle |
| HEART    | `heart`    | heart   |
| POLYGON  | `polygon`  | polygon |

## CLOCK

> type`ClockOptionsType`。

| attribute         | type                | Default                              | limit      | remarks                            |
| ------------ | ------------------- | ----------------------------------- | --------- | ------------------------------- |
| `textTime`   | `'time' or 's'   or ''` | `''`                                |           | Text display mode: time: mm/dd/yy, s: sec |
| `lineColors` | `Array<string>`     | `['#d4d4d4', '#06ab2d', '#8a0303']` | length<=3 | Pointer color                        |
| `lineCap`    | `CanvasLineCap`     | `round`                             |           | Line style                        |
| `lineWidth`  | `number`            | `12`                                |           | Linewidth                          |
| `clockSize`  | `number`            | 15                                  |           | Clock size                       |
| `clockGap`   | `number`            | 4                                   |           | Clock gap                     |
| `hLine`      | `boolean`           | true                                |           | Time pointer display                      |
| `mLine`      | `boolean`           | false                               |           | Pointer display                      |
| `sLine`      | `boolean`           | true                                |           | Second pointer display                      |

## BEAN

> type`BeanOptionsType`。

| attribute          | type       | Default | limit | remarks              |
| ------------- | ---------- | ------ | ---- | ----------------- |
| `beanSize`    | `'number'` | `15`   | >=5  | bean Size        |
| `pointLength` | `number`   | `16`   | >=5  | The number of points in the bean |

## ROLL

> Type `RollOptionsType`, this module `delay` cannot be modified.

| attribute                 | type            | Default                                         | limit      | remarks                            |
| -------------------- | --------------- | ---------------------------------------------- | --------- | ------------------------------- |
| `rollSize`           | `number`        | `16`                                           | length<=3 | roll size                        |
| `showChild`          | `boolean`       | `true`                                         |           | Show shadow child                   |
| `childNum`           | `number`        | `4`                                            | [4-10]    | Child shadow quantity                   |
| `rollGap` | `number` | `12` |  | Shadow gap |
| `chart`              | `ROLL_CHART`    | `ROLL_CHART.WHEEL`                             |           | Displayed graphics                      |
| `windmills`          | `Array<string>` | `['#1ab3ea', '#de6834', '#30925d', '#f48ea5']` |           | The figure is the blade color of Windmills.   |
| `windmillPointColor` | `string`        | `#f2c31f`                                      |           | The middle point color when the graph is Windmills. |
| `fixad`              | `boolean`       | `false`                                        |           | Center fixed or not                    |

### ROLL.chart

> enumeration `ROLL_CHART`。

| attribute     | enum     | remarks |
| -------- | ---------- | ---- |
| RECT     | `rect`     | rect |
| WHEEL    | `wheel`    | wheel |
| WINDMILL | `windmill` | windmill |

## Circular

> type`CircularOptionsType`。

| 属性        | 类型              | 默认值                                         | 备注                     |
| ----------- | ----------------- | ---------------------------------------------- | ------------------------ |
| `arcSize`   | `number`          | `8`                                            | Circle size              |
| `arcGap`    | `number`          | `2`                                            | Circular gap             |
| `arcColors` | `Array<string>`   | `['#ec7546', '#8364a4', '#ff6c6e', '#5bc6ab']` | Custom color for circles |
| `action`    | `CIRCULAR_ACTION` | `CIRCULAR_ACTION.COLLISION`                    | action                   |

### Circular.action

> enumeration `CIRCULAR_ACTION`。

| 属性      | 枚举值      | 备注   |
| --------- | ----------- | ------ |
| COLLISION | `Collision` | move   |
| ROTATE    | `rotate`    | rotate |

## IMG

> type`ImageOptionsType`。

| attribute     | type      | Default           | remarks     |
| -------- | --------- | ---------------- | -------- |
| `src`    | `string`  | WebLoading logo | pictures linking |
| `width`  | `number`  | `52`             | image width |
| `height` | `number`  | `52`             | Picture height |
| `turn`   | `boolean` | `true`           | Rotation or not |

> `Img `creates a` HTMLImageElement `, so use` src `to be compatible with it.

## SKELETON

> type `SkeletonOptionsType`。
> 
> `Skeleton` No skeleton is generated for embedded text.

| attribute                     | type      | Default               | remarks             |
| ------------------------ | --------- | -------------------- | ---------------- |
| `skeletonColor`          | `string`  | `rgb(240, 240, 240)` | Skeleton default color |
| `skeletonAnimationColor` | `string`  | `rgb(226, 226, 226)` | Skeleton animation color |
| `radius`                 | `number`  | `5`                  | Skeleton fillet     |
| `animation`              | `boolean` | `true`               | Show Animation         |
| `deep`                   | `boolean` | `true`               | deep skeleton     |
| `appoint`                | `string`  | `''`                 | Specify the element skeleton |

### SKELETON上拉加载例子

> Business scenario: The function is to **specify some elements** to display the skeleton, such as pull-up loading. Only the last or more module elements need to be dynamically displayed to display the skeleton. At this time, it is recommended to specify the elements.
@[code](./SKELETON.html)
> Here, the native html method is used to introduce and display, and other web frameworks are the same. Here, **elements are used to separate**. Of course, `appoint` can also be used to specify elements.

## HTEMLElmenttype involved

### CanvasLineCap

| attribute   | type   | remarks |
| ------ | ------ | ---- |
| butt   | string |      |
| round  | string |      |
| square | string |      |

