## WebLoading

> 无论是`DOM`还是`FULL`、`MINI`最终都会走`WebLoading`

```typescript
import 'web-loading-test'
// 获取dom
let dom:HtmlElement = document.querySelector('xxx')
let loading = dom.loading()
console.log(loading)
```

> `loading`：`reload`、`resize`、`close`函数

### reload

> 重新加载`loading`

+ 参数
  + `options?:OptionsType`

> 调用loading后`WebLoading`会保存一份`options`，`reload`默认使用上一次的`options`，但`reload`接受`options`参数可以覆盖之前配置。

### resize

> 重新计算并绘制`loading`大小

+ 参数：无

> `resize`会从绑定的`HtmlElement`中重新获取大小并重新绘制，此函数不会重新实例`WebLoading`与`reload`业务场景不同，例如`window.addEventListener('resize', loading.resize)`可能会使用到

### close

> 关闭`loading`

+ 参数：无

> `close`首先会清空所有`WebLoading`的`store`以及其他记录，并停止`requestAnimationFrame`调用，最后根据`delayColse`清除相关元素，关闭过程中`WebLoading`会使用`hookCall`触发`hook`关闭**钩子函数**(`BEFORE_COLSE`:关闭前，`COLSED`：关闭后，也就是清除元素后)，以便于绘制**model**。

## options

```typescript
import 'web-loading-test'
// 获取dom
let dom:HtmlElement = document.querySelector('xxx')
let loading = dom.loading({
    model:
})
```

