import { HOOKS_CALL_KEY } from '../utils'
export type HooksType<T extends string = HOOKS_CALL_KEY> = {
  [key in T]: Array<Function>
}
