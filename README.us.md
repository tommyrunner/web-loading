# guide

## introduce

There are many ways to implement loading on the Web, such as using `css` animation,`js` operation element, `gif` image, `svg` animation, and `loading` in the `ui` framework. Each has its own advantages. The operation element may be more convenient, but it will affect performance or other elements. The dynamic image performance is good, but the customization is not ideal.

`WebLoading `is a` loading `animation plug-in based on` js` encapsulation, which is mainly drawn through `Canvas`, without worrying about affecting the elements in the interface. Various **model** modules are provided by default. Each **model** has a special `option` parameter to adjust and customize. If you want to be closer to the business, you can use `custom` to customize. `WebLoading` provides` BaseModel `inheritance` class` to make it easier for you to customize your own `loading`.

## realization

`Each **model** in WebLoading `is drawn using` Canvas`. The startup methods include `DOM` (element mount), `FULL` (full screen), and `MINI` (mobile terminal).

The principle is very similar. For `DOM`, first we need `initLoading` to initialize the **model** that you need to render and provide custom parameters. Of course, this operation is not necessary, because `WebLoading` has initialized all the default data. At this time, the operation `WebLoading` related function is thrown.

Starting the `WebLoading` and calling the `loading` function requires a `HtmlElement` element, which must have `children` instead of a single label element. When you start `WebLoading`, you will get the mounted element and add a `Canvas` in` children `. At the same time, the location and size of the element will be calculated and synchronized to` Canvas` for optimal display` WebLoading `will draw the specific **model** according to the` options` parameter, and the **model** mainly uses the `requestAnimationFrame` to callback and render multiple times to achieve each frame of animation.

`WebLoading ` package is mainly divided into three layers
+ Interaction layer: operations between developers and `WebLoading`, such as initialization, startup, shutdown, obtaining relevant information, etc.
+ Logical layer: get the elements to be initialized and mounted after `WebLoading` receives` options` and `canvas`.
+ Model layer: Inherit `BaseModel` to get the initialized `canvas` for drawing module.

## install

> Download according to your own package management tool.

```sh
npm install web-loading
```

## use

### Get Element

```typescript
// No frame
let dom = document.querySelector('xxx')
// vue 
let dom = ref()
// ...(The purpose is to get the dom element)
```

### Global introduction

+ introduce

```typescript
import 'web-loading'
```

+ initialization

```typescript
// Introduce initLoading globally and mount it on window
let webLoading = initLoading({
    // Custom options
})
```

> + parameter
>   + `options?:OptionsType`

### Individually introduced

+ introduce

```typescript
import initLoading from 'web-loading/src/loading'
```

+ initialization

```typescript
import type { LoadingType } from 'web-loading/src/type.d'
let webLoading:LoadingType = initLoading({
    // Custom options
})
```

> + parameter
>   + `options?:OptionsType`

### start-up

```typescript
 webLoading.loading(dom)
```

> parameter
>
> + `dom`:Mounted`HtmlElement`element
>
> + `options?:OptionsType`, each startup supports coverage`options`.

## Start mode

`DOM `,` FULL `,` MINI `All three startup methods need to be based on` HtmlElement `, where` FULL `and` MINI `are the extended startup methods, and` HtmlElement `is not required in the parameters, because` WebLoading `has processed the process from creation to disappearance of elements.

+ Modify the `type` switch start mode

```typescript
import type { LoadingType } from 'web-loading/src/type.d'
let webLoading:LoadingType = initLoading({
   type:'mini' // or full
})
// start
webLoading.loading()
```

+ Function modification

```typescript
import {fullLoading,miniLoading} from 'web-loading/src/loading'
let webLoading:LoadingType = fullLoading() // miniLoading
// start
webLoading.loading()
```

> + Global introduction. Similarly, functions have been mounted on `window`.
> + Function modification `WebLoading` is also implemented internally by modifying `type`.
> + The extension start mode does not need to provide elements.