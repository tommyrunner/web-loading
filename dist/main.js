(()=>{"use strict";var t,i,s,e,o;function h(){return{custom:null,html:"",type:t.DOM,miniClass:"mini",model:i.GEAR,text:"加载中...",textGap:8,fontSize:12,fontFamily:"Microsoft YaHei",delay:65,delayColse:520,optimization:!1,zIndex:"2001",themeColor:"rgba(64,158,255,1)",bgColor:"rgba(0, 0, 0, 0.8)",shadowColor:"rgba(64,158,255,0.6)",shadowOffsetX:2,shadowOffsetY:2,shadowBlur:5,pointerEvents:!1}}(o=t||(t={})).DOM="dom",o.FULL="full",o.MINI="mini",function(t){t.GEAR="Gear",t.RING="Ring",t.ZOOM="Zoom",t.PATTERN="Pattern",t.CLOCK="Clock",t.BEAN="Bean",t.ROLL="Roll",t.Circular="Circular",t.IMG="Img",t.SKELETON="Skeleton"}(i||(i={})),function(t){t.BEFORE_COLSE="beforeColse",t.COLSED="colsed"}(s||(s={})),function(t){t[t.INFO=1]="INFO",t[t.WARN=2]="WARN",t[t.ERROR=3]="ERROR"}(e||(e={}));class n{static info(t){this.call(t,e.INFO)}static warn(t){this.call(t,e.WARN)}static error(t){this.call(t,e.ERROR)}static call(t,i=e.INFO,s={color:h().themeColor,bgColor:h().bgColor}){let o=s.bgColor;2===i&&(o="#fffbe5"),3===i&&(o="#fff0f0");const n=`\n      background:${o};\n      font-size:14px;\n      color:${s.color};\n      padding: 4px;\n      border: 1px solid;`;console.log(`%c web-loading:${t} `,n)}}function a(t){return null==t}function l(t){window.requestAnimationFrame?window.cancelAnimationFrame(t):window.clearInterval(t)}function c(t){try{return Object.prototype.toString.call(t).split(" ")[1].split("]")[0].toLowerCase()}catch(t){return"not-type"}}class r{constructor(t,i,s,e,o){this.w=t,this.h=i,this.canvas=s,this.ctx=s.getContext("2d"),this.options=e,this.store=o,this.webLog=n,this.stepClear=1,this._$initPoint(),this._$initEvent()}_$initPoint(){this.clearRect(),this.ctx.resetTransform();const t=this.options,i=this.canvas.width,s=this.canvas.height;this.ctx.fillStyle=t.themeColor,this.ctx.strokeStyle=t.themeColor,this.ctx.shadowColor=t.shadowColor,this.ctx.font=`${t.fontSize}px ${t.fontFamily} small-caps`,this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.translate(i/2,s/2);const e=window.devicePixelRatio||1;this.ctx.scale(e,e),this.ctx.save()}_$initEvent(){this.store.hookCall.beforeColse((()=>{this.clearRect()}))}animationFrame(t){window.requestAnimationFrame||(this.store.animationId=window.setInterval(t,this.options.delay));let i=Date.now()+this.options.delay;t.call(this);const s=()=>{Date.now()>i&&(t.call(this),i=Date.now()+this.options.delay),this.store.animationId=window.requestAnimationFrame(s)};this.store.animationId=window.requestAnimationFrame(s)}run(t){this.store.animationId&&this.clearAnimationFrame(this.store.animationId),this.animationFrame(t)}clearAnimationFrame(t){l(t)}initOptions(t,i){this.options=Object.assign(t,this.options),this.store.options=this.options,i&&i.length&&i.forEach((t=>{const i=this.options[t.key];a(i)||t.limit(i)||n.warn(t.message)}))}clearRect(t,i,s,e){const o=this.canvas.width,h=this.canvas.height;if(a(t)||a(i)||a(s)||a(e))if(a(t)||a(i)||a(s)||!a(e))this.ctx.clearRect(-o,-h,2*o,2*h);else{const e=s-this.stepClear,o=Math.sqrt(s*s-e*e),h=t-e,n=i-o,a=2*e,l=2*o;this.stepClear<=s?(this.ctx.clearRect(h,n,a,l),this.stepClear+=1,this.clearRect(t,i,s)):this.stepClear=1}else this.ctx.clearRect(t,i,s,e)}drowRadiusRect(t,i,s,e,o){this.ctx.beginPath(),this.ctx.arc(t+o,i+o,o,1*Math.PI,1.5*Math.PI),this.ctx.lineTo(t+s-o,i),this.ctx.arc(t+s-o,i+o,o,1.5*Math.PI,0),this.ctx.lineTo(t+s,i+e-o),this.ctx.arc(t+s-o,i+e-o,o,0,.5*Math.PI),this.ctx.lineTo(t+o,i+e),this.ctx.arc(t+o,i+e-o,o,.5*Math.PI,Math.PI),this.ctx.lineTo(t,i+o),this.ctx.closePath()}}const x={lineStart:10,lineEnd:16,lineStartSkew:0,lineEndSkew:0,lineWidth:4,lineCap:"round",lineNum:10,direction:!0},d=[{key:"lineNum",message:"lineNum value 4-18",limit:t=>t>=4&&t<=18}];var w,p,m,g;!function(t){t.SCALE="scale",t.WAVE="wave",t.HEIGHT="height"}(w||(w={})),function(t){t.RECT="rect",t.ARC="arc",t.TRIANGLE="triangle",t.HEART="heart",t.POLYGON="polygon"}(p||(p={})),function(t){t.RECT="rect",t.WHEEL="wheel",t.WINDMILL="windmill"}(m||(m={})),function(t){t.COLLISION="Collision",t.ROTATE="rotate"}(g||(g={}));const u={zoomGap:10,maxSize:16,zoomNum:5,lineWidth:10,zoomHeight:2,lineCap:"round",action:w.SCALE,direction:!0,zoomColors:[]},S=[{key:"lineWidth",message:"lineWidth(default:10) <=  maxSize(default:16)",limit:t=>t<=u.maxSize},{key:"maxSize",message:"lineWidth(default:10) <=  maxSize(default:16)",limit:t=>u.lineWidth<=t}],f={arcGap:Math.PI/4,ringGap:10,lineWidth:2,ringNum:2,radius:6,lineCap:"round",turn:10,ringsTurn:[Math.PI,Math.PI/4],direction:!0},C=[{key:"ringNum",message:"ringNum value 1-10",limit:t=>t>=1&&t<=10},{key:"ringsTurn",message:`ringsTurn size ${f.ringNum}`,limit:t=>t.length<=f.ringNum}],A={beanSize:15,pointLength:15},b=[{key:"pointLength",message:"pointLength value >= 5",limit:t=>t>=5},{key:"beanSize",message:"beanSize value >= 5",limit:t=>t>=5}],P={lineCap:"round",lineWidth:2,lineColors:["#d4d4d4","#06ab2d","#8a0303"],clockSize:15,clockGap:4,hLine:!0,mLine:!1,sLine:!0,textTime:""},E=[{key:"lineColors",message:"lineColors.length <= 3",limit:t=>t.length<=3}],I={charts:[p.ARC,p.RECT,p.TRIANGLE,p.HEART,p.POLYGON],chartColors:["#409EFF","#67C23A","#E6A23C","#F56C6C","#0960bd"],maxHeight:60,chartSize:12},y=[{key:"chartSize",message:"chartSize value 5-24",limit:t=>t>=5&&t<=24},{key:"delay",message:"Pattern.delay not allowed update",limit:t=>t===h().delay}],z={rollGap:12,childNum:4,rollSize:16,showChild:!0,chart:m.WHEEL,windmills:["#1ab3ea","#de6834","#30925d","#f48ea5"],windmillPointColor:"#f2c31f",fixad:!1},k=[{key:"childNum",message:"chartSize value 4-10",limit:t=>t>=4&&t<=10},{key:"delay",message:"Roll.delay not allowed update",limit:t=>t===h().delay}],v={arcSize:8,arcGap:2,arcColors:["#ec7546","#8364a4","#ff6c6e","#5bc6ab"],action:g.COLLISION},R={src:"data:image/png;base64,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",width:52,height:52,turn:!0},O={skeletonColor:"rgb(240, 240, 240)",skeletonAnimationColor:"rgb(226, 226, 226)",radius:5,animation:!0,deep:!0,appoint:""},T={Gear:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(x,d),this.optimization(this.options.textGap+this.options.lineEnd),this.initPoint(),this.aps=Array.from({length:this.options.lineNum},((t,i)=>i)),this.run(this.draw)}initPoint(){const t=this.options;this.ctx.lineCap=t.lineCap,this.ctx.lineWidth=t.lineWidth,this.ctx.save()}draw(){this.clearRect(),this.controller(),this.drawGear(),this.drawText()}controller(){this.options.direction?this.aps=this.aps.map((t=>t-1<=0?this.aps.length-1:t-1)):this.aps=this.aps.map((t=>t+1>this.aps.length?0:t+1))}drawGear(){const t=this.options;this.ctx.save(),this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur;for(let i=0;i<this.aps.length;i++)this.ctx.beginPath(),this.ctx.globalAlpha=this.aps[i]/10,this.ctx.moveTo(t.lineEndSkew,t.lineStart),this.ctx.lineTo(t.lineStartSkew,t.lineEnd),this.ctx.stroke(),this.ctx.closePath(),this.ctx.rotate(2*Math.PI/t.lineNum);this.ctx.restore()}drawText(){const t=this.options;this.ctx.save(),this.ctx.beginPath();const i=t.lineEnd+t.fontSize+t.textGap;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}optimization(t){this.options.optimization&&4*t>this.h&&(this.options.lineStart=this.h/6-5,this.options.lineEnd=this.h/6,this.options.textGap=2)}},Zoom:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(u,S),this.initPoint(),this.zoomIndex=this.options.direction?0:this.options.zoomNum-1,this.list=Array.from({length:this.options.zoomNum},((t,i)=>Object.assign({value:this.options.lineWidth,state:0}))),this.run(this.draw)}initPoint(){const t=this.options;this.ctx.lineCap=t.lineCap,this.ctx.lineWidth=t.lineWidth,this.ctx.translate(-(t.lineWidth*(t.zoomNum+1)+t.zoomGap*(t.zoomNum+1))/2,-t.zoomHeight/2),this.ctx.save()}draw(){this.clearRect(),this.drawZoom(),this.drawText(),this.controller()}controller(){const t=this.options;t.direction&&this.zoomIndex>=t.zoomNum?this.zoomIndex=0:t.direction&&this.zoomIndex<0&&(this.zoomIndex=t.zoomNum-1)}drawZoom(){const t=this.options;for(let i=0;i<t.zoomNum;i++){1===this.list[i].state?this.list[i].value+=2:2===this.list[i].state&&this.list[i].value>=t.lineWidth&&this.list[i].value--,t.action===w.SCALE&&(this.ctx.lineWidth=this.list[i].value),i===this.zoomIndex&&(this.list[i].value>t.maxSize&&(this.list[i].state=2,t.direction?this.zoomIndex++:this.zoomIndex-1>=0?this.zoomIndex--:this.zoomIndex=t.zoomNum-1),this.list[i].value<=t.lineWidth&&(this.list[i].state=1)),this.ctx.beginPath(),t.zoomColors.length>0&&t.zoomColors[i]?this.ctx.strokeStyle=t.zoomColors[i]:this.ctx.strokeStyle=t.themeColor;let s=0,e=t.zoomHeight;t.action!==w.HEIGHT&&t.action!==w.WAVE||(s=-this.list[i].value),t.action===w.WAVE&&(e=-this.list[i].value),this.ctx.moveTo((i+1)*(t.lineWidth+t.zoomGap),s),this.ctx.lineTo((i+1)*(t.lineWidth+t.zoomGap),e),this.ctx.stroke(),this.ctx.closePath()}}drawText(){const t=this.options;this.ctx.save(),this.ctx.beginPath();const i=t.fontSize+t.maxSize;this.ctx.fillText(t.text,(t.lineWidth*(t.zoomNum+1)+t.zoomGap*(t.zoomNum+1))/2,i),this.ctx.closePath(),this.ctx.restore()}},Ring:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.rotate=10,this.initOptions(f,C),this.initPoint(),this.run(this.draw)}initPoint(){const t=this.options;this.ctx.lineCap=t.lineCap,this.ctx.lineWidth=t.lineWidth,this.ctx.save()}draw(){this.clearRect(),this.controller(),this.drawText()}controller(){this.ctx.save();const t=this.options,i=this.rotate*Math.PI/180*(t.direction?1:-1);this.ctx.rotate(i),this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur;for(let i=1;i<=t.ringNum;i++)this.drawRing(t.radius+(i-1)*t.ringGap,t.arcGap,t.ringsTurn&&t.ringsTurn.length>0?t.ringsTurn[i-1]:Math.PI/i);this.rotate+=t.turn,this.ctx.restore()}drawText(){const t=this.options;this.ctx.save(),this.ctx.beginPath();const i=t.ringNum*(t.radius+t.ringGap)+t.textGap;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}drawRing(t,i=1,s=0){this.ctx.beginPath(),this.ctx.arc(0,0,t,i+s,Math.PI+s),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.ctx.arc(0,0,t,Math.PI+i+s,s),this.ctx.stroke(),this.ctx.closePath()}},Bean:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(A,b),this.bean={turn:30,state:1,beanState:1,nowX:-this.options.pointLength*this.options.beanSize/2-3*this.options.beanSize,beans:Array.from({length:this.options.pointLength},(()=>1)),beanAnimaIndex:0},this.options.delay=10,this.run(this.draw)}draw(){const t=this.options;this.clearRect(),this.ctx.save(),this.ctx.beginPath(),this.ctx.translate(this.bean.nowX,0),this.ctx.arc(0,0,t.beanSize,(360-this.bean.turn)*Math.PI/180,this.bean.turn*Math.PI/180,!0),this.ctx.lineTo(0,0),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore(),this.drawPoint(),this.drawFillter(),this.drawText(),this.controller()}controller(){const t=this.options;this.bean.nowX>=t.pointLength*t.beanSize/2+2*t.beanSize&&(this.bean.nowX=-t.pointLength*t.beanSize/2-3*t.beanSize,this.bean.beanAnimaIndex=0),this.bean.nowX<=-t.pointLength*t.beanSize/2&&(this.bean.beanState=2),this.bean.turn<=0&&(this.bean.state=2),this.bean.turn>=30&&(this.bean.state=1),1===this.bean.state&&(this.bean.turn-=1),2===this.bean.state&&(this.bean.turn+=1),1===this.bean.beanState&&(this.bean.nowX-=1),2===this.bean.beanState&&(this.bean.nowX+=1)}drawPoint(){const t=this.options;this.ctx.save(),this.setShadow(),this.ctx.translate(-t.pointLength*t.beanSize/2,0);for(let i=0;i<t.pointLength&&i<this.bean.beanAnimaIndex;i++)this.ctx.beginPath(),i<this.bean.beanAnimaIndex&&this.ctx.arc(t.beanSize*i,0,t.beanSize/4,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath();this.bean.beanAnimaIndex+=.2,this.ctx.restore()}drawFillter(){const t=this.options;this.clearRect(-t.beanSize/3+this.bean.nowX,-t.beanSize/2,t.beanSize/4),this.clearRect(-t.pointLength*t.beanSize/2-t.beanSize/2+.2,-this.h,this.bean.nowX+t.pointLength*t.beanSize/2-t.beanSize/2,2*this.h),this.clearRect(-t.pointLength*t.beanSize/2,-this.h,-180,2*this.h),this.clearRect(t.pointLength*t.beanSize/2,-this.h,180,2*this.h)}setShadow(){const t=this.options;this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur}drawText(){const t=this.options;this.ctx.save(),this.ctx.beginPath();const i=t.fontSize+t.textGap+t.beanSize;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}},Clock:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(P,E),this.initPoint(),this.nowTime=-1,this.nowS=0,this.run(this.draw)}initPoint(){const t=this.options;this.ctx.lineCap=t.lineCap,this.ctx.lineWidth=t.lineWidth,this.ctx.save()}draw(){this.clearRect(),this.drawClock()}drawText(t,i,s){const e=this.options;this.ctx.save(),this.ctx.beginPath();const o=2*e.clockSize+e.textGap;"time"===e.textTime&&(e.text=`${t} : ${i} : ${s}`),"s"===e.textTime&&(e.text=this.nowTime+"s"),this.ctx.fillText(e.text,0,o),this.ctx.closePath(),this.ctx.restore()}drawClock(){const t=this.options,i=(new Date).getSeconds(),s=(new Date).getMinutes(),e=(new Date).getHours();this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.moveTo(-5,-(t.clockSize+t.clockGap)),this.ctx.lineTo(5,-(t.clockSize+t.clockGap)),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.setShadow(),this.ctx.arc(0,0,t.clockSize,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore(),this.ctx.save();for(let i=0;i<12;i++)this.ctx.beginPath(),this.ctx.rotate(30*Math.PI/180),this.ctx.moveTo(t.clockSize-t.clockGap,0),this.ctx.lineTo(t.clockSize-t.clockGap,0),this.ctx.stroke(),this.ctx.closePath();this.ctx.restore(),t.hLine&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.lineWidth=1.6*t.lineWidth,t.lineColors[0]&&(this.ctx.strokeStyle=t.lineColors[0]),this.ctx.rotate(-90*Math.PI/180),this.ctx.rotate(360*e/60*Math.PI/180),this.ctx.moveTo(-1,0),this.ctx.lineTo(t.clockSize/2,0),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()),t.mLine&&(this.ctx.save(),this.ctx.beginPath(),t.lineColors[1]&&(this.ctx.strokeStyle=t.lineColors[1]),this.ctx.lineWidth=1.2*t.lineWidth,this.ctx.rotate(-90*Math.PI/180),this.ctx.rotate(360*s/60*Math.PI/180),this.ctx.moveTo(-1,0),this.ctx.lineTo(t.clockSize/2+t.clockGap,0),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()),t.sLine&&(this.ctx.save(),this.ctx.beginPath(),t.lineColors[2]&&(this.ctx.strokeStyle=t.lineColors[2]),this.ctx.rotate(-90*Math.PI/180),this.ctx.rotate(360*i/60*Math.PI/180),this.ctx.moveTo(-1,0),this.ctx.lineTo(t.clockSize-t.clockGap,0),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore(),this.nowS!==i&&this.nowTime++,this.nowS=i),this.drawText(e,s,i)}setShadow(){const t=this.options;this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur}},Pattern:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(I,y),this.initPoint(),this.pattern={color:this.randomState("chartColors"),nowHeight:10,chart:this.randomState("charts"),shadow:0,nowSatate:1,turn:0},this.run(this.draw)}initPoint(){this.options.delay=10}draw(){const t=this.options;this.clearRect(),this.ctx.save(),this.ctx.beginPath(),this.ctx.translate(0,this.pattern.nowHeight),this.ctx.rotate(this.pattern.turn/Math.PI*2),this.ctx.fillStyle=this.pattern.color,this.selectChart(0,0,t.chartSize),this.ctx.closePath(),this.ctx.restore(),this.drawShadow(),this.clearRect(-this.w,0,2*this.w,this.h),this.controller(t),this.drawText(t)}controller(t){this.pattern.turn+=10,1===this.pattern.nowSatate?(this.pattern.nowHeight--,this.pattern.shadow+=.2):2===this.pattern.nowSatate&&(this.pattern.nowHeight++,this.pattern.shadow-=.2),this.pattern.shadow=Math.floor(100*this.pattern.shadow)/100,this.pattern.nowHeight<=-t.chartSize&&this.pattern.nowHeight%8==0&&(t.delay+=.5,t.delay=Math.floor(100*t.delay)/100),this.pattern.nowHeight<=-t.maxHeight?this.pattern.nowSatate=2:this.pattern.nowHeight>=t.chartSize&&(this.pattern.nowSatate=1,t.delay=10,this.pattern.chart=this.randomState("charts"),this.pattern.color=this.randomState("chartColors"))}selectChart(t,i,s){switch(this.pattern.chart){case p.RECT:this.drawRect(t,i,s);break;case p.ARC:this.drawArc(t,i,s);break;case p.TRIANGLE:this.drawTriangle(t,i,s);break;case p.HEART:this.drawHeart(t,i,s);break;case p.POLYGON:this.drawPolygon(t,i,s)}}randomState(t){const i=this.options;return i[t][parseInt(String(Math.random()*i[t].length))]}drawText(t){this.ctx.save(),this.ctx.beginPath(),this.ctx.fillStyle=this.pattern.color;const i=t.fontSize+t.textGap;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}drawShadow(){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.globalAlpha=.2,this.ctx.strokeStyle=this.pattern.color,this.ctx.moveTo(-this.pattern.shadow/2,0),this.ctx.lineTo(this.pattern.shadow,0),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.restore()}drawRect(t,i,s){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.translate(-s/2,-s/2),this.ctx.fillRect(t,i,s,s),this.ctx.closePath(),this.ctx.restore()}drawArc(t,i,s){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.arc(t,i,s/2,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()}drawTriangle(t,i,s){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.translate(-s/2,-s/2*Math.sqrt(3)/2),this.ctx.moveTo(t,i),this.ctx.lineTo(s,0),this.ctx.lineTo(s/2,s/2*Math.sqrt(3)),this.ctx.lineTo(t,i),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()}drawHeart(t,i,s){s/=2,this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.translate(0,-2*s/2),this.ctx.moveTo(t,i),this.ctx.bezierCurveTo(s/2,-s,3*s,-s/2,i,2*s),this.ctx.moveTo(t,i),this.ctx.bezierCurveTo(-s/2,-s,3*-s,-s/2,i,2*s),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()}drawPolygon(t,i,s){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.translate(-s/2,-s/2),this.ctx.moveTo(t,i),this.ctx.lineTo(s,i),this.ctx.lineTo(s+s/2,s/2),this.ctx.lineTo(s,s/2+s/2),this.ctx.lineTo(t,s),this.ctx.lineTo(t-s/2,s-s/2),this.ctx.lineTo(t,i),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()}setShadow(){const t=this.options;this.ctx.shadowColor=this.pattern.color,this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur}},Roll:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(z,k),this.Roll={turn:1,nowX:this.options.fixad?0:this.options.childNum/2*(this.options.rollSize+this.options.rollGap)+this.options.rollGap/2,state:2,child:[]},this.run(this.draw)}draw(){this.clearRect(),this.drawGround(),this.drawChild(),this.ctx.save(),this.ctx.beginPath(),this.ctx.translate(-this.Roll.nowX,0),this.ctx.rotate(this.Roll.turn*Math.PI/180),this.selectChart(),this.controller(),this.ctx.restore(),this.drawText()}selectChart(){switch(this.options.chart){case m.RECT:this.drawRect();break;case m.WHEEL:this.drawWheel();break;case m.WINDMILL:this.drawWindmill()}}controller(){const t=this.options;if(1===this.Roll.state&&(this.Roll.turn-=10,t.delay<20&&!t.fixad&&(t.delay+=2)),2===this.Roll.state&&(this.Roll.turn+=10,t.delay>10&&!t.fixad&&(t.delay-=5)),t.fixad)return;this.Roll.nowX<=-t.childNum/2*(t.rollSize+t.rollGap/1.6)&&(this.Roll.state=1),this.Roll.nowX>=t.childNum/2*(t.rollSize+t.rollGap)+t.rollGap/2&&(this.Roll.state=2),1===this.Roll.state&&this.Roll.nowX++,2===this.Roll.state&&this.Roll.nowX--;const i=this.Roll.child;this.Roll.nowX%(t.rollSize+t.rollGap)==0&&2===this.Roll.state&&i.push({turn:this.Roll.turn,x:this.Roll.nowX}),1===this.Roll.state&&i[i.length-1]&&i[i.length-1].x===this.Roll.nowX&&this.Roll.child.pop()}drawRect(){const t=this.options;this.ctx.save(),this.setShadow(),this.ctx.translate(-t.rollSize/2,-t.rollSize/2),this.ctx.fillRect(0,0,t.rollSize,t.rollSize),this.ctx.restore()}drawWheel(){const t=this.options;this.ctx.save(),this.ctx.lineWidth=4,this.ctx.beginPath(),this.ctx.arc(0,0,t.rollSize/6,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.ctx.arc(0,0,t.rollSize/2,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.ctx.arc(0,0,t.rollSize,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath();for(let i=0;i<6;i++)this.ctx.beginPath(),this.ctx.moveTo(0,t.rollSize/2),this.ctx.lineTo(0,t.rollSize),this.ctx.stroke(),this.ctx.rotate(60*Math.PI/180),this.ctx.closePath();this.ctx.restore()}drawWindmill(){const t=this.options;this.ctx.save();for(let i=0;i<t.windmills.length;i++)this.ctx.beginPath(),this.ctx.fillStyle=t.windmills[i],this.ctx.arc(-t.rollSize/2,0,t.rollSize,0,Math.PI),this.ctx.fill(),this.ctx.closePath(),this.ctx.rotate(90*Math.PI/180);this.ctx.beginPath(),this.ctx.fillStyle=t.windmillPointColor,this.ctx.arc(0,0,t.rollSize/2,0,2*Math.PI),this.ctx.fill(),this.ctx.restore()}drawChild(){this.options.showChild&&this.Roll.child.forEach(((t,i)=>{this.ctx.save(),this.ctx.translate(-t.x,0),this.ctx.globalAlpha=(i+1)/10,this.ctx.rotate(t.turn*Math.PI/180),this.selectChart(),this.ctx.restore()}))}drawGround(){const t=this.options;t.chart===m.WHEEL&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.lineWidth=3,this.ctx.globalAlpha=.03,this.ctx.moveTo(-t.childNum/2*(t.rollSize+t.rollGap/1.6),t.rollSize+3),this.ctx.lineTo(t.childNum/2*(t.rollSize+t.rollGap)+t.rollGap/2,t.rollSize+3),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore())}drawText(){const t=this.options;this.ctx.save(),this.ctx.beginPath();const i=t.fontSize+t.textGap+t.rollSize;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}setShadow(){const t=this.options;this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur}},Circular:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(v);let h=this.options,n=2*h.arcSize+h.arcGap;this.collsionPoint=[{key:0,state:!1,y:-n,x:0},{key:1,state:!1,y:n,x:0},{key:2,state:!1,y:0,x:n},{key:3,state:!1,y:0,x:-n}],this.run(this.draw)}draw(){this.clearRect();let t=this.options;this.collsionPoint.forEach(((i,s)=>{if(this.ctx.save(),this.ctx.beginPath(),t.arcColors[s]){let i=t.arcColors[s];this.setShadow(i),this.ctx.fillStyle=i}this.ctx.arc(i.x,i.y,t.arcSize,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()})),t.action===g.COLLISION?this.controller():t.action===g.ROTATE&&this.ctx.rotate(10/Math.PI*2)}controller(){let t=this.options;this.collsionPoint.forEach((i=>{let s="y";switch(i.key){case 0:case 1:s="y";break;case 2:case 3:s="x"}let e=2*t.arcSize+t.arcGap;i[s]===-e&&(i.state=!0),i[s]===e&&(i.state=!1),i.state?i[s]++:i[s]--}))}setShadow(t){const i=this.options;t&&(this.ctx.shadowColor=t),this.ctx.shadowOffsetX=i.shadowOffsetX,this.ctx.shadowOffsetY=i.shadowOffsetY,this.ctx.shadowBlur=i.shadowBlur}drawText(){const t=this.options;this.ctx.save(),this.ctx.beginPath();const i=t.fontSize+t.textGap;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}},Img:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(R,[]),this.img=new Image,this.img.src=this.options.src,this.turn=10,this.img.onload=()=>{this.run(this.draw)}}draw(){this.clearRect(),this.drawImg(),this.drawText()}drawImg(){const t=this.options;this.ctx.save(),t.turn&&this.ctx.rotate(this.turn*Math.PI/180),this.ctx.drawImage(this.img,-t.width/2,-t.height/2,t.width,t.height),this.ctx.closePath(),this.ctx.restore(),this.turn+=10}drawText(){const t=this.options;this.ctx.save(),this.ctx.beginPath();const i=t.fontSize+t.textGap+t.height/2;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}},Skeleton:class extends r{constructor(t,i,s,e,o){super(t,i,s,e,o),this.initOptions(O,[]),this.skeleton=[],this.colorFlow=0,this.state=1,this.WL_IMG="wl-img",this.initPoint(),this.controller(this.store.element.children),this.run(this.draw)}initPoint(){const t=this.options;this.ctx.translate(-this.w/2,-this.h/2),this.canvas.width=this.store.element.scrollWidth,this.canvas.height=this.store.element.scrollHeight,this.ctx.fillStyle=t.skeletonColor}draw(){this.clearRect(),this.drawSkeleton()}controller(t){const i=this.options;for(const s of Array.from(t))this.store.loadingId!==s.id&&(i.appoint.length>0&&null===s.getAttribute(i.appoint)||(i.deep?s.children.length<=0?this.skeleton.push({title:s.nodeName,element:s}):this.controller(s.children):this.skeleton.push({title:s.nodeName,element:s})))}drawSkeleton(){const t=this.options,i=this.ctx.createLinearGradient(0,0,this.w,this.h);i.addColorStop(0,t.skeletonColor),i.addColorStop(this.colorFlow,t.skeletonAnimationColor),i.addColorStop(1,t.skeletonColor),t.animation&&(this.ctx.fillStyle=i),this.skeleton.forEach((i=>{const s=i.element;this.drowRadiusRect(s.offsetLeft,s.offsetTop,s.offsetWidth,s.offsetHeight,t.radius),this.ctx.fill()})),t.animation&&(this.colorFlow>=.9&&(this.state=2),this.colorFlow<=.1&&(this.state=1),1===this.state&&(this.colorFlow+=.06),2===this.state&&(this.colorFlow-=.06))}}};function L(t,i,s,e,o){try{let h=null;h=e.custom?new e.custom(t,i,s,e,o.element.$store):new T[e.model](t,i,s,e,o.element.$store),o.model=h}catch(t){n.error("draw error("+t+")")}}class M{constructor(t){this.options=Object.assign(h(),t),this.canvas=null,this.htmlElement=null,this.loadingId=null,this.element=null,this.hooks=null}resize(t,i){if(this.canvas){let s=i;s.width=t.clientWidth,s.height=t.clientHeight,t.$store&&L(s.offsetWidth,s.offsetHeight,s,this.options,t.$store)}else this.htmlElement&&(this.htmlElement.style.width=t.clientWidth+"px",this.htmlElement.style.height=t.clientHeight+"px")}close(i,e){const o=this.options,h=i.$store;this.clearStyle(i,e),o.type!==t.DOM||o.pointerEvents||(i.style.pointerEvents="auto"),h&&(h.model=null,this.callEvent(s.BEFORE_COLSE),h.animationId&&l(h.animationId)),window.setTimeout((()=>{o.type!==t.DOM?i.remove():e.remove(),this.loadingId=null,this.callEvent(s.COLSED),this.hooks=this.initHooksCall()}),o.delayColse)}initCanvas(){return this.canvas=document.createElement("canvas"),this.hooks=this.initHooksCall(),this.loadingId=String("wl_"+Date.now()),{canvas:this.canvas,hooks:this.hooks,loadingId:this.loadingId}}initHtml(){let t=this.options;return this.htmlElement=document.createElement("div"),this.htmlElement.innerHTML=t.html,this.loadingId=String("wl_"+Date.now()),{content:this.htmlElement,loadingId:this.loadingId}}clearStyle(i,s){s.style.opacity="0",this.options.type!==t.DOM&&(i.style.boxShadow="none")}initContentStyle(i,s,e){const o=this.options,h=i.clientWidth,n=i.clientHeight,a=window.getComputedStyle(i),l=i.style,r=e.style;i.loadingId=s,o.type!==t.DOM||o.pointerEvents||(i.style.pointerEvents="none"),a.position&&"static"!==a.position||(l.position="relative"),e.id=s,document.styleSheets[0].insertRule("\n@keyframes wl_show {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n"),e.style.animation=`wl_show ${o.delayColse/1e3}s linear`,r.position="absolute",r.left=`${o.pointerEvents?0:i.scrollLeft}px`,r.top=`${o.pointerEvents?0:i.scrollTop}px`,r.zIndex=o.zIndex,r.transition=o.delayColse/1e3+"s",r.backgroundColor=o.bgColor,r.borderRadius=a.borderRadius,"htmlcanvaselement"===c(e)?this.setupCanvas(e,h,n):"htmldivelement"===c(e)&&(r.width=h+"px",r.height=n+"px",r.display="flex",r.alignItems="center",r.justifyContent="center"),i.append(e),this.element=i}setupCanvas(t,i,s){const e=window.devicePixelRatio||1;return t.width=i*e,t.height=s*e,t.style.width=`${i}px`,t.style.height=`${s}px`,t}draw(t){if(this.options.html){const i=this.initHtml();this.initContentStyle(t,i.loadingId,i.content)}else{const i=this.initCanvas();if(this.initContentStyle(t,i.loadingId,i.canvas),this.initStore(t,i.hooks),t.$store){const s=i.canvas;L(s.offsetWidth,s.offsetHeight,s,this.options,t.$store)}else n.error("WebLoading:canvas or ctx null")}}initStore(t,i){t.$store={options:this.options,element:t,animationId:void 0,loadingId:this.loadingId,model:null,hookCall:this.initStoreHooksCall(i)}}initHooksCall(){return{[s.BEFORE_COLSE]:[],[s.COLSED]:[]}}initStoreHooksCall(t){return{[s.BEFORE_COLSE]:i=>{t[s.BEFORE_COLSE].push(i)},[s.COLSED]:i=>{t[s.COLSED].push(i)}}}callEvent(t){this.hooks&&this.hooks[t].forEach((t=>{t()}))}}const G=document;class N{constructor(t){this.options=t,this.extendEl=this.initStyle()}initStyle(){this.extendEl=document.createElement("div");const i=this.options;let s="100vw",e="100vh",o="0px";return i&&(this.extendEl.classList.add("wl_"+(i.miniClass||"loading")),i.type===t.MINI&&(s="180px",e="160px",o="10px"),this.extendEl.style.cssText=`\n          position:fixed;\n          width:${s};\n          height:${e};\n          top:50%;\n          left:50%;\n          transform:translate(-50%, -50%);\n          border-radius: ${o};\n          z-index: ${i.zIndex};\n          box-shadow:\n          2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),\n          6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),\n          12.5px 12.5px 10px rgba(0, 0, 0, 0.035),\n          22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),\n          41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),\n          100px 100px 80px rgba(0, 0, 0, 0.07)\n          ;\n      `),G.body.appendChild(this.extendEl),this.extendEl}getElement(){return this.extendEl}}function W(i){const s=new M(i);return{loading:(i,e)=>{const o=Object.assign(s.options,e);s.loadingId||(o.type!==t.DOM&&(i=new N(o).getElement()),i?s.draw(i):n.error("loading函数未找到HTMLElement元素!"))},resize:()=>{s.element&&s.canvas&&s.resize(s.element,s.canvas),s.element&&s.htmlElement&&s.resize(s.element,s.htmlElement)},close:()=>{s.element&&s.canvas&&s.close(s.element,s.canvas),s.element&&s.htmlElement&&s.close(s.element,s.htmlElement)},update:t=>{const i=s.canvas,e=Object.assign(s.options,t),o=s.element;i&&e&&o&&o.$store&&L(i.offsetWidth,i.offsetHeight,i,e,o.$store)},getOptions:()=>s.options,getLoadingId:()=>s.loadingId}}function B(t,i){return W(Object.assign(h(),i||{},{type:t}))}const H=window;H.BaseModel=r,H.initLoading=function(t){return W(t)},H.miniLoading=i=>B(t.MINI,i),H.fullLoading=i=>B(t.FULL,i)})();