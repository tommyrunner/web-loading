export enum CIRCULAR_ACTION {
  COLLISION = 'collision',
  ROTATE = 'rotate'
}

export enum ZOOM_ACTION {
  SCALE = 'scale',
  WAVE = 'wave',
  HEIGHT = 'height'
}
export enum PATTERN_CHART {
  RECT = 'rect',
  ARC = 'arc',
  TRIANGLE = 'triangle',
  HEART = 'heart',
  POLYGON = 'polygon'
}
export enum CLOCK_TEXT {
  TIME = 'time',
  S = 's',
  NULL = ''
}
export enum ROLL_CHART {
  RECT = 'rect',
  WHEEL = 'wheel',
  WINDMILL = 'windmill'
}
export enum OPTIONS_FORM {
  GG = 'gg',
  MODEL = 'model'
}
export enum OPTIONS_TYPE {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  SELECT = 'select',
  COLOR = 'color',
  ARRAY_STRING = 'array_string',
  ARRAY_NUMBER = 'array_number'
}
export enum CANVAS_LINE_CAP {
  butt = 'butt',
  round = 'round',
  square = 'square'
}

export enum MODEL_TYPES {
  GEAR = 'Gear',
  RING = 'Ring',
  ZOOM = 'Zoom',
  PATTERN = 'Pattern',
  CLOCK = 'Clock',
  BEAN = 'Bean',
  ROLL = 'Roll',
  Circular = 'Circular',
  IMG = 'Img',
  SKELETON = 'Skeleton'
}

export enum LOADING_TYPES {
  DOM = 'dom',
  FULL = 'full',
  MINI = 'mini'
}

export default {}
