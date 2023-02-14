export const canvasList = [
  {
    model: 'Gear',
    options: {}
  },
  {
    model: 'Ring',
    options: {}
  },
  {
    model: 'Zoom',
    options: {
      delay: 36,
      zoomGap: 9,
      zoomHeight: 4,
      zoomColors: [
        'rgba(244,67,54,1)',
        'rgba(233,30,99,1)',
        'rgba(33,150,243,1)',
        'rgba(139,195,74,1)',
        'rgba(166,27,217,1)'
      ],
      action: 'height'
    }
  },
  {
    model: 'Pattern',
    options: { chartColors: ['rgba(64,158,255,1)'] }
  },
  {
    model: 'Clock',
    options: { fontSize: 13, textTime: 's', clockSize: 19 }
  },
  {
    model: 'Bean',
    options: { pointLength: 10 }
  },
  {
    model: 'Roll',
    options: { childNum: 3, rollGap: 20 }
  },
  {
    model: 'Circular',
    options: { delay: 21, action: 'rotate' }
  },
  {
    model: 'Img',
    options: { delay: 49 }
  },
  {
    model: 'Skeleton',
    options: { bgColor: 'rgba(0,0,0,0)', pointerEvents: true }
  }
]
