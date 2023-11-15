[official website](https://tommyrunner.github.io/web-loading/)
# guide

> Recent changes:
>
> + ***Due to a change in the packaging method, the path of "Introducing Objects or Types" has changed, and the latest document shall prevail***
> + New Senseless Refresh
> + Optimize source code
> + Resolve the second flash screen bug

## introduce

There are many ways to implement loading on the Web, such as using `css` animation,`js` operation element, `gif` image, `svg` animation, and `loading` in the `ui` framework. Each has its own advantages. The operation element may be more convenient, but it will affect performance or other elements. The dynamic image performance is good, but the customization is not ideal.

`WebLoading`is a `loading`animation plug-in based on web encapsulation. The main **model** is drawn through` Canvas`. This method will not affect the elements in the interface. Of course, `WebLoading` also provides`html`configuration, which is compatible with the **html** loading method. The default **model** module provides its own `options` configuration attribute. If you want to be closer to the business, you can use`Custom`to customize it.`WebLoading`provides` BaseModel` inheritance `class` to make it easier for you to customize your own`loading`or`html`loading method.

## realization

`Each **model** in WebLoading `is drawn using` Canvas`. The startup methods include `DOM` (element mount), `FULL` (full screen), and `MINI` (mobile terminal).

The principle is very similar. For `DOM`, first we need `initLoading` to initialize the **model** that you need to render and provide custom parameters. Of course, this operation is not necessary, because `WebLoading` has initialized all the default data. At this time, the operation `WebLoading` related function is thrown.

Starting the `WebLoading` and calling the `loading` function requires a `HtmlElement` element, which must have `children` instead of a single label element. When you start `WebLoading`, you will get the mounted element and add a `Canvas` in`children`. At the same time, the location and size of the element will be calculated and synchronized to` Canvas` for optimal display`WebLoading`will draw the specific **model** according to the` options` parameter, **In model** recursive callback rendering is mainly performed using `requestAnimationFrame` to achieve each frame of animation.

Note: If the configuration is rendered through **html**, you will not go to the next step.

`WebLoading ` package is mainly divided into three layers

- Interaction layer: operations between developers and `WebLoading`, such as initialization, startup, shutdown, obtaining relevant information, etc.
- Logical layer: get the elements to be initialized and mounted after `WebLoading` receives` options` and `canvas`.
- Model layer: Inherit `BaseModel` to get the initialized `canvas` for drawing module.

## install

> Download according to your own package management tool.

```sh
npm install web-loading
```

## use

### CDN introduction

```html
<script src="https://cdn.jsdelivr.net/npm/web-loading"></script>
<script>
	const webLoading = window.fullLoading({})
    // initLoading、fullLoading、miniLoading All bound to the window...
</script>
```

### Introduction of engineering projects

```typescript
import type { LoadingType } from "web-loading";
import { initLoading } from "web-loading";
let webLoading: LoadingType = initLoading({
    // Custom options
})
```

> - parameter
>   - `options?:OptionsType`
> - return
>   - `webLoading:LoadingType`

### Get Element

```typescript
// No frame
let dom = document.querySelector('xxx')
// vue
let dom = ref()
// ...If it is FULL or MINI, it is not necessary to obtain the element
```

### start-up

```typescript
// Note: After the dom loading is completed, call loading
window.onload = function () {
  webLoading.loading(dom)
}
```

> parameter
>
> - `dom`:Mounted`HtmlElement`element
>
> - `options?:OptionsType`, Support Overrides`options`.

## Start mode

`DOM `,`FULL`,`MINI`All three startup methods need to be based on`HtmlElement`, where`FULL`and`MINI`are the extended startup methods, and`HtmlElement`is not required in the parameters, because`WebLoading`has processed the process from creation to disappearance of elements.

```typescript
import type { LoadingType } from "web-loading";
import { fullLoading,miniLoading LOADING_TYPES } from "web-loading";

let webLoading: LoadingType = fullLoading() // full screen
// let webLoading: LoadingType = miniLoading() // mobile terminal

// Start (if it is MINI or FULL, there is no need to pass dom)
webLoading.loading()
```
