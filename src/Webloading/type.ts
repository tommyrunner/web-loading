import { HOOKS_CALL_KEY } from '../utils'
/**
 * @description 钩子类型
 * @template T - 扩展自钩子调用键
 */
export type HooksType<T extends string = HOOKS_CALL_KEY> = {
  [key in T]: Array<Function>
}
