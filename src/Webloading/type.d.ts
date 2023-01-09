import { HOOKSCALL_KEY } from '../utils'
export type HooksType<T extends string = HOOKSCALL_KEY> = {
  [key in T]: Array<Function>
}
