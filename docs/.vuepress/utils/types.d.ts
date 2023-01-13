import { MODEL_TYPES } from 'web-loading/src/utils'
import { OPTIONS_FORM, OPTIONS_TYPE } from './options'
export interface OptionsItemsModelType {
  GEAR: 'Gear'
  RING: 'Ring'
  ZOOM: 'Zoom'
  PATTERN: 'Pattern'
  CLOCK: 'Clock'
  BEAN: 'Bean'
  ROLL: 'Roll'
  SKELETON: 'Skeleton'
  IMG: 'Img'
}
export interface OptionsItemsCapType {
  butt: 'butt'
  round: 'round'
  square: 'square'
}
export type OptionsType = {
  title: string
  key: string
  type: OPTIONS_TYPE
  form: OPTIONS_FORM
  value: MODEL_TYPES | string | number | boolean
  items?: OptionsItemsModelType | OptionsItemsCapType
  min?: number
  max?: number
  model?: MODEL_TYPES
}
