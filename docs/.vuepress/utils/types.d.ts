import { MODEL_TYPES } from 'web-loading/src/utils'
import { OPTIONS_FORM, OPTIONS_TYPE } from './enum'
export interface OptionsItemsModelType {
  GEAR: 'Gear'
  RING: 'Ring'
  ZOOM: 'Zoom'
  PATTERN: 'Pattern'
  CLOCK: 'Clock'
  BEAN: 'Bean'
  ROLL: 'Roll'
  CIRCULAR: 'Circular'
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
  value: MODEL_TYPES | string | number | boolean | Array<OptionsType>
  items?: OptionsItemsModelType | OptionsItemsCapType
  arrayItems?: Array<OptionsType>
  arrayAdd?: OptionsType
  min?: number
  max?: number
  step?: number
  model?: MODEL_TYPES
  disabled?: boolean
}
