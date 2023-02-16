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
    options: { delay: 21, action: 'rotate', text: '' }
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
export const htmlList = [
  {
    model: 'html-01',
    html: `<div class="loader"></div>`,
    css: `.loader {
      position: relative;
      width: 120px;
      height: 90px;
      margin: 0 auto;
    }
    
    .loader:before {
      content: "";
      position: absolute;
      bottom: 30px;
      left: 50px;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background: #2a9d8f;
      animation: loading-bounce 0.5s ease-in-out infinite alternate;
    }
    
    .loader:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      height: 7px;
      width: 45px;
      border-radius: 4px;
      box-shadow: 0 5px 0 #f2f2f2, -35px 50px 0 #f2f2f2, -70px 95px 0 #f2f2f2;
      animation: loading-step 1s ease-in-out infinite;
    }
    
    @keyframes loading-bounce {
      0% {
        transform: scale(1, 0.7);
      }
    
      40% {
        transform: scale(0.8, 1.2);
      }
    
      60% {
        transform: scale(1, 1);
      }
    
      100% {
        bottom: 140px;
      }
    }
    
    @keyframes loading-step {
      0% {
        box-shadow: 0 10px 0 rgba(0, 0, 0, 0),
                0 10px 0 #f2f2f2,
                -35px 50px 0 #f2f2f2,
                -70px 90px 0 #f2f2f2;
      }
    
      100% {
        box-shadow: 0 10px 0 #f2f2f2,
                -35px 50px 0 #f2f2f2,
                -70px 90px 0 #f2f2f2,
                -70px 90px 0 rgba(0, 0, 0, 0);
      }
    }`
  },
  {
    model: 'html-02',
    html: `<div class="spinner">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>`,
    css: `.spinner {
      width: 60px;
      height: 60px;
      position: relative;
     }
     
     .spinner .dot {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
     }
     
     .spinner .dot::after {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: rgb(12, 180, 231);
     }
     
     @keyframes spin {
      to {
       transform: rotate(360deg);
      }
     }
     
     .spinner .dot {
      animation: spin 2s infinite;
     }
     
     .spinner .dot:nth-child(2) {
      animation-delay: 100ms;
     }
     
     .spinner .dot:nth-child(3) {
      animation-delay: 200ms;
     }
     
     .spinner .dot:nth-child(4) {
      animation-delay: 300ms;
     }
     
     .spinner .dot:nth-child(5) {
      animation-delay: 400ms;
     }`
  },
  {
    model: 'html-03',
    html: `<div class="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>`,
    css: `.loader {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(#ee280e, #15a0f7, #6ed15a);
  animation: animate7712 1.2s linear infinite;
}

@keyframes animate7712 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader span {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(#ee280e, #15a0f7, #5ad15a);
}

.loader:after {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: #333;
  border: solid #333 10px;
  border-radius: 50%;
}

.loader span:nth-child(1) {
  filter: blur(5px);
}

.loader span:nth-child(2) {
  filter: blur(10px);
}

.loader span:nth-child(3) {
  filter: blur(25px);
}

.loader span:nth-child(4) {
  filter: blur(50px);
}`
  },
  {
    model: 'html-04',
    html: `<div class="container">
    <div class="item item-1"></div>
    <div class="item item-2"></div>
    <div class="item item-3"></div>
    <div class="item item-4"></div>
</div>`,
    css: `.container {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.item {
  width: 50px;
  height: 50px;
  position: absolute;
}

.item-1 {
  background-color: rgb(250, 87, 103);
  top: 0;
  left: 0;
  z-index: 1;
  animation: item-1_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-2 {
  background-color: rgb(121, 68, 228);
  top: 0;
  right: 0;
  animation: item-2_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-3 {
  background-color: rgb(27, 145, 247);
  bottom: 0;
  right: 0;
  z-index: 1;
  animation: item-3_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-4 {
  background-color: rgb(250, 194, 76);
  bottom: 0;
  left: 0;
  animation: item-4_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

@keyframes item-1_move {
  0%, 100% {
    transform: translate(0, 0)
  }

  25% {
    transform: translate(0, 50px)
  }

  50% {
    transform: translate(50px, 50px)
  }

  75% {
    transform: translate(50px, 0)
  }
}

@keyframes item-2_move {
  0%, 100% {
    transform: translate(0, 0)
  }

  25% {
    transform: translate(-50px, 0)
  }

  50% {
    transform: translate(-50px, 50px)
  }

  75% {
    transform: translate(0, 50px)
  }
}

@keyframes item-3_move {
  0%, 100% {
    transform: translate(0, 0)
  }

  25% {
    transform: translate(0, -50px)
  }

  50% {
    transform: translate(-50px, -50px)
  }

  75% {
    transform: translate(-50px, 0)
  }
}

@keyframes item-4_move {
  0%, 100% {
    transform: translate(0, 0)
  }

  25% {
    transform: translate(50px, 0)
  }

  50% {
    transform: translate(50px, -50px)
  }

  75% {
    transform: translate(0, -50px)
  }
}`
  },
  {
    model: 'html-05',
    html: `<div class="loader">
    <div class="bar bar1"></div>
    <div class="bar bar2"></div>
    <div class="bar bar3"></div>
    <div class="bar bar4"></div>
    <div class="bar bar5"></div>
    <div class="bar bar6"></div>
    <div class="bar bar7"></div>
    <div class="bar bar8"></div>
</div>`,
    css: `.loader {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.bar {
  width: 10px;
  height: 70px;
  background: hsl(0, 100%, 50%);
  display: inline-block;
  transform-origin: bottom center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  animation: loader8913 1.2s linear infinite;
}

.bar1 {
  animation-delay: 0.1s;
}

.bar2 {
  animation-delay: 0.2s;
}

.bar3 {
  animation-delay: 0.3s;
}

.bar4 {
  animation-delay: 0.4s;
}

.bar5 {
  animation-delay: 0.5s;
}

.bar6 {
  animation-delay: 0.6s;
}

.bar7 {
  animation-delay: 0.7s;
}

.bar8 {
  animation-delay: 0.8s;
}

@keyframes loader8913 {
  0% {
    transform: scaleY(0.1);
  }

  50% {
    transform: scaleY(1);
    background: yellowgreen;
  }

  100% {
    transform: scaleY(0.1);
    background: transparent;
  }
}
`
  },
  {
    model: 'html-06',
    html: `
    <div class="loader">
      <span class="loader-text">loading</span>
        <span class="load"></span>
    </div>
  `,
    css: `.loader {
      width: 80px;
      height: 50px;
      position: relative;
    }
    
    .loader-text {
      position: absolute;
      top: 0;
      padding: 0;
      margin: 0;
      color: #C8B6FF;
      animation: text_713 3.5s ease both infinite;
      font-size: .8rem;
      letter-spacing: 1px;
    }
    
    .load {
      background-color: #9A79FF;
      border-radius: 50px;
      display: block;
      height: 16px;
      width: 16px;
      bottom: 0;
      position: absolute;
      transform: translateX(64px);
      animation: loading_713 3.5s ease both infinite;
    }
    
    .load::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background-color: #D1C2FF;
      border-radius: inherit;
      animation: loading2_713 3.5s ease both infinite;
    }
    
    @keyframes text_713 {
      0% {
        letter-spacing: 1px;
        transform: translateX(0px);
      }
    
      40% {
        letter-spacing: 2px;
        transform: translateX(26px);
      }
    
      80% {
        letter-spacing: 1px;
        transform: translateX(32px);
      }
    
      90% {
        letter-spacing: 2px;
        transform: translateX(0px);
      }
    
      100% {
        letter-spacing: 1px;
        transform: translateX(0px);
      }
    }
    
    @keyframes loading_713 {
      0% {
        width: 16px;
        transform: translateX(0px);
      }
    
      40% {
        width: 100%;
        transform: translateX(0px);
      }
    
      80% {
        width: 16px;
        transform: translateX(64px);
      }
    
      90% {
        width: 100%;
        transform: translateX(0px);
      }
    
      100% {
        width: 16px;
        transform: translateX(0px);
      }
    }
    
    @keyframes loading2_713 {
      0% {
        transform: translateX(0px);
        width: 16px;
      }
    
      40% {
        transform: translateX(0%);
        width: 80%;
      }
    
      80% {
        width: 100%;
        transform: translateX(0px);
      }
    
      90% {
        width: 80%;
        transform: translateX(15px);
      }
    
      100% {
        transform: translateX(0px);
        width: 16px;
      }
    }
    `
  },
  {
    model: 'html-07',
    html: `<svg class="gegga">
    <defs>
        <filter id="gegga">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10" result="inreGegga"></feColorMatrix>
            <feComposite in="SourceGraphic" in2="inreGegga" operator="atop"></feComposite>
        </filter>
    </defs>
</svg>
<svg class="snurra" width="200" height="200" viewBox="0 0 200 200">
    <defs>
        <linearGradient id="linjärGradient">
            <stop class="stopp1" offset="0"></stop>
            <stop class="stopp2" offset="1"></stop>
        </linearGradient>
        <linearGradient y2="160" x2="160" y1="40" x1="40" gradientUnits="userSpaceOnUse" id="gradient" xlink:href="#linjärGradient"></linearGradient>
    </defs>
    <path class="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"></path>
    <circle class="strecken" cx="100" cy="100" r="64"></circle>
</svg>
<svg class="skugga" width="200" height="200" viewBox="0 0 200 200">
    <path class="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"></path>
    <circle class="strecken" cx="100" cy="100" r="64"></circle>
</svg>`,
    css: `.gegga {
  width: 0;
}

.snurra {
  filter: url(#gegga);
}

.stopp1 {
  stop-color: #f700a8;
}

.stopp2 {
  stop-color: #ff8000;
}

.halvan {
  animation: Snurra1 10s infinite linear;
  stroke-dasharray: 180 800;
  fill: none;
  stroke: url(#gradient);
  stroke-width: 23;
  stroke-linecap: round;
}

.strecken {
  animation: Snurra1 3s infinite linear;
  stroke-dasharray: 26 54;
  fill: none;
  stroke: url(#gradient);
  stroke-width: 23;
  stroke-linecap: round;
}

.skugga {
  filter: blur(5px);
  opacity: 0.3;
  position: absolute;
  transform: translate(3px, 3px);
}

@keyframes Snurra1 {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -403px;
  }
}
`
  },
  {
    model: 'html-08',
    html: `<svg class="pl" width="128px" height="128px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <circle class="pl__ring1" cx="64" cy="64" r="60" fill="none" stroke="hsl(3,90%,55%)" stroke-width="8" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="377 377" stroke-dashoffset="-376.4"></circle>
    <circle class="pl__ring2" cx="64" cy="64" r="52.5" fill="none" stroke="hsl(13,90%,55%)" stroke-width="7" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="329.9 329.9" stroke-dashoffset="-329.3"></circle>
    <circle class="pl__ring3" cx="64" cy="64" r="46" fill="none" stroke="hsl(23,90%,55%)" stroke-width="6" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="289 289" stroke-dashoffset="-288.6"></circle>
    <circle class="pl__ring4" cx="64" cy="64" r="40.5" fill="none" stroke="hsl(33,90%,55%)" stroke-width="5" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="254.5 254.5" stroke-dashoffset="-254"></circle>
    <circle class="pl__ring5" cx="64" cy="64" r="36" fill="none" stroke="hsl(43,90%,55%)" stroke-width="4" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="226.2 226.2" stroke-dashoffset="-225.8"></circle>
    <circle class="pl__ring6" cx="64" cy="64" r="32.5" fill="none" stroke="hsl(53,90%,55%)" stroke-width="3" transform="rotate(-90,64,64)" stroke-linecap="round" stroke-dasharray="204.2 204.2" stroke-dashoffset="-203.9"></circle>
  </svg>`,
    css: `/* From cssbuttons.io by @harmankanda.github.io/New */

  .pl {
   width: 5em;
   height: 5em;
  }
  
  .pl circle {
   transform-box: fill-box;
   transform-origin: 50% 50%;
  }
  
  .pl__ring1 {
   animation: ring1 4s 0s ease-in-out infinite;
  }
  
  .pl__ring2 {
   animation: ring2 4s 0.04s ease-in-out infinite;
  }
  
  .pl__ring3 {
   animation: ring3 4s 0.08s ease-in-out infinite;
  }
  
  .pl__ring4 {
   animation: ring4 4s 0.12s ease-in-out infinite;
  }
  
  .pl__ring5 {
   animation: ring5 4s 0.16s ease-in-out infinite;
  }
  
  .pl__ring6 {
   animation: ring6 4s 0.2s ease-in-out infinite;
  }
  
  /* Animations */
  @keyframes ring1 {
   from {
    stroke-dashoffset: -376.237129776;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }
  
   23% {
    stroke-dashoffset: -94.247778;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }
  
   46%, 50% {
    stroke-dashoffset: -376.237129776;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }
  
   73% {
    stroke-dashoffset: -94.247778;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }
  
   96%, to {
    stroke-dashoffset: -376.237129776;
    transform: rotate(4.75turn);
   }
  }
  
  @keyframes ring2 {
   from {
    stroke-dashoffset: -329.207488554;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }
  
   23% {
    stroke-dashoffset: -82.46680575;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }
  
   46%, 50% {
    stroke-dashoffset: -329.207488554;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }
  
   73% {
    stroke-dashoffset: -82.46680575;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }
  
   96%, to {
    stroke-dashoffset: -329.207488554;
    transform: rotate(4.75turn);
   }
  }
  
  @keyframes ring3 {
   from {
    stroke-dashoffset: -288.4484661616;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }
  
   23% {
    stroke-dashoffset: -72.2566298;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }
  
   46%, 50% {
    stroke-dashoffset: -288.4484661616;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }
  
   73% {
    stroke-dashoffset: -72.2566298;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }
  
   96%, to {
    stroke-dashoffset: -288.4484661616;
    transform: rotate(4.75turn);
   }
  }
  
  @keyframes ring4 {
   from {
    stroke-dashoffset: -253.9600625988;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }
  
   23% {
    stroke-dashoffset: -63.61725015;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }
  
   46%, 50% {
    stroke-dashoffset: -253.9600625988;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }
  
   73% {
    stroke-dashoffset: -63.61725015;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }
  
   96%, to {
    stroke-dashoffset: -253.9600625988;
    transform: rotate(4.75turn);
   }
  }
  
  @keyframes ring5 {
   from {
    stroke-dashoffset: -225.7422778656;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }
  
   23% {
    stroke-dashoffset: -56.5486668;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }
  
   46%, 50% {
    stroke-dashoffset: -225.7422778656;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }
  
   73% {
    stroke-dashoffset: -56.5486668;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }
  
   96%, to {
    stroke-dashoffset: -225.7422778656;
    transform: rotate(4.75turn);
   }
  }
  
  @keyframes ring6 {
   from {
    stroke-dashoffset: -203.795111962;
    transform: rotate(-0.25turn);
    animation-timing-function: ease-in;
   }
  
   23% {
    stroke-dashoffset: -51.05087975;
    transform: rotate(1turn);
    animation-timing-function: ease-out;
   }
  
   46%, 50% {
    stroke-dashoffset: -203.795111962;
    transform: rotate(2.25turn);
    animation-timing-function: ease-in;
   }
  
   73% {
    stroke-dashoffset: -51.05087975;
    transform: rotate(3.5turn);
    animation-timing-function: ease-out;
   }
  
   96%, to {
    stroke-dashoffset: -203.795111962;
    transform: rotate(4.75turn);
   }
  }`
  },
  {
    model: 'html-09',
    html: `<div class="loader JS_on">
    <span class="binary"></span>
    <span class="binary"></span>
    <span class="getting-there">LOADING STUFF...</span>
  </div>`,
    css: `.loader {
    width: 130px;
    height: 170px;
    position: relative;
    font-family: inherit;
  }
  
  .loader::before, .loader::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    bottom: 30px;
    left: 15px;
    z-index: 1;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 20px solid #1b2a33;
    transform: scale(0);
    transition: all 0.2s ease;
  }
  
  .loader::after {
    border-right: 15px solid transparent;
    border-bottom: 20px solid #162229;
  }
  
  .loader .getting-there {
    width: 120%;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: -7%;
    font-size: 12px;
    letter-spacing: 2px;
    color: white;
  }
  
  .loader .binary {
    width: 100%;
    height: 140px;
    display: block;
    color: white;
    position: absolute;
    top: 0;
    left: 15px;
    z-index: 2;
    overflow: hidden;
  }
  
  .loader .binary::before, .loader .binary::after {
    font-family: "Lato";
    font-size: 24px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  
  .loader .binary:nth-child(1)::before {
    content: "0";
    animation: a 1.1s linear infinite;
  }
  
  .loader .binary:nth-child(1)::after {
    content: "0";
    animation: b 1.3s linear infinite;
  }
  
  .loader .binary:nth-child(2)::before {
    content: "1";
    animation: c 0.9s linear infinite;
  }
  
  .loader .binary:nth-child(2)::after {
    content: "1";
    animation: d 0.7s linear infinite;
  }
  
  .loader.JS_on::before, .loader.JS_on::after {
    transform: scale(1);
  }
  
  @keyframes a {
    0% {
      transform: translate(30px, 0) rotate(30deg);
      opacity: 0;
    }
  
    100% {
      transform: translate(30px, 150px) rotate(-50deg);
      opacity: 1;
    }
  }
  
  @keyframes b {
    0% {
      transform: translate(50px, 0) rotate(-40deg);
      opacity: 0;
    }
  
    100% {
      transform: translate(40px, 150px) rotate(80deg);
      opacity: 1;
    }
  }
  
  @keyframes c {
    0% {
      transform: translate(70px, 0) rotate(10deg);
      opacity: 0;
    }
  
    100% {
      transform: translate(60px, 150px) rotate(70deg);
      opacity: 1;
    }
  }
  
  @keyframes d {
    0% {
      transform: translate(30px, 0) rotate(-50deg);
      opacity: 0;
    }
  
    100% {
      transform: translate(45px, 150px) rotate(30deg);
      opacity: 1;
    }
  }
  `
  }
]
