(()=>{"use strict";var t,i,e,s,o;function h(){return{custom:null,type:t.DOM,miniClass:"mini",model:i.GEAR,text:"加载中...",textGap:8,fontSize:12,fontFamily:"Microsoft YaHei",delay:65,delayColse:520,optimization:!1,zIndex:"2001",themeColor:"rgba(64,158,255,1)",bgColor:"rgba(0, 0, 0, 0.8)",shadowColor:"rgba(64,158,255,0.6)",shadowOffsetX:2,shadowOffsetY:2,shadowBlur:5,pointerEvents:!1}}(o=t||(t={})).DOM="dom",o.FULL="full",o.MINI="mini",function(t){t.GEAR="Gear",t.RING="Ring",t.ZOOM="Zoom",t.PATTERN="Pattern",t.CLOCK="Clock",t.BEAN="Bean",t.ROLL="Roll",t.IMG="Img",t.SKELETON="Skeleton"}(i||(i={})),function(t){t.BEFORE_COLSE="beforeColse",t.COLSED="colsed"}(e||(e={})),function(t){t[t.INFO=1]="INFO",t[t.WARN=2]="WARN",t[t.ERROR=3]="ERROR"}(s||(s={}));class a{static info(t){this.call(t,s.INFO)}static warn(t){this.call(t,s.WARN)}static error(t){this.call(t,s.ERROR)}static call(t,i=s.INFO,e={color:h().themeColor,bgColor:h().bgColor}){let o=e.bgColor;2===i&&(o="#fffbe5"),3===i&&(o="#fff0f0");let a=`\n      background:${o};\n      font-size:14px;\n      color:${e.color};\n      padding: 4px;\n      border: 1px solid;`;console.log(`%c web-loading:${t} `,a)}}function n(t){return null==t}function l(t){window.requestAnimationFrame?window.cancelAnimationFrame(t):window.clearInterval(t)}class r{constructor(t,i,e,s,o){this.w=t,this.h=i,this.canvas=e,this.ctx=e.getContext("2d"),this.options=s,this.store=o,this.webLog=a,this.stepClear=1,this._$initPoint(),this._$initEvent()}initOptions(t,i){this.options=Object.assign(t,this.options),this.store.options=this.options,i&&i.length&&i.forEach((t=>{let i=this.options[t.key];n(i)||t.limit(i)||a.warn(t.message)}))}_$initPoint(){this.clearRect(),this.ctx.resetTransform();let t=this.options,i=this.canvas.width,e=this.canvas.height;this.ctx.fillStyle=t.themeColor,this.ctx.strokeStyle=t.themeColor,this.ctx.shadowColor=t.shadowColor,this.ctx.font=`${t.fontSize}px ${t.fontFamily}`,this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.translate(i/2,e/2),this.ctx.save()}_$initEvent(){this.store.hookCall.beforeColse((()=>{this.clearRect()}))}clearRect(t,i,e,s){let o=this.canvas.width,h=this.canvas.height;if(n(t)||n(i)||n(e)||n(s))if(n(t)||n(i)||n(e)||!n(s))this.ctx.clearRect(-o,-h,2*o,2*h);else{let s=e-this.stepClear,o=Math.sqrt(e*e-s*s),h=t-s,a=i-o,n=2*s,l=2*o;this.stepClear<=e?(this.ctx.clearRect(h,a,n,l),this.stepClear+=1,this.clearRect(t,i,e)):this.stepClear=1}else this.ctx.clearRect(t,i,e,s)}drowRadiusRect(t,i,e,s,o){this.ctx.beginPath(),this.ctx.arc(t+o,i+o,o,1*Math.PI,1.5*Math.PI),this.ctx.lineTo(t+e-o,i),this.ctx.arc(t+e-o,i+o,o,1.5*Math.PI,0),this.ctx.lineTo(t+e,i+s-o),this.ctx.arc(t+e-o,i+s-o,o,0,.5*Math.PI),this.ctx.lineTo(t+o,i+s),this.ctx.arc(t+o,i+s-o,o,.5*Math.PI,Math.PI),this.ctx.lineTo(t,i+o),this.ctx.closePath()}run(t){this.store.animationId&&this.clearAnimationFrame(this.store.animationId),this.animationFrame(t)}animationFrame(t){window.requestAnimationFrame||(this.store.animationId=window.setInterval(t,this.options.delay));let i=Date.now()+this.options.delay;t.call(this);const e=()=>{Date.now()>i&&(t.call(this),i=Date.now()+this.options.delay),this.store.animationId=window.requestAnimationFrame(e)};this.store.animationId=window.requestAnimationFrame(e)}clearAnimationFrame(t){l(t)}}const c={lineStart:10,lineEnd:16,lineStartSkew:0,lineEndSkew:0,lineWidth:4,lineCap:"round",lineNum:10,direction:!0},x=[{key:"lineNum",message:"lineNum value 4-18",limit:t=>t>=4&&t<=18}];var d,w,p;!function(t){t.SCALE="scale",t.WAVE="wave",t.HEIGHT="height"}(d||(d={})),function(t){t.RECT="rect",t.ARC="arc",t.TRIANGLE="triangle",t.HEART="heart",t.POLYGON="polygon"}(w||(w={})),function(t){t.RECT="rect",t.WHEEL="wheel",t.WINDMILL="windmill"}(p||(p={}));const m={zoomGap:10,maxSize:16,zoomNum:5,lineWidth:10,zoomHeight:2,lineCap:"round",action:d.SCALE,direction:!0,zoomColors:[]},g=[{key:"lineWidth",message:"lineWidth(default:10) <=  maxSize(default:16)",limit:t=>t<=m.maxSize},{key:"maxSize",message:"lineWidth(default:10) <=  maxSize(default:16)",limit:t=>m.lineWidth<=t}],u={arcGap:Math.PI/4,ringGap:10,lineWidth:2,ringNum:2,radius:6,lineCap:"round",turn:10,ringsTurn:[Math.PI,Math.PI/4],direction:!0},S=[{key:"ringNum",message:"ringNum value 1-10",limit:t=>t>=1&&t<=10},{key:"ringsTurn",message:`ringsTurn size ${u.ringNum}`,limit:t=>t.length<=u.ringNum}],A={beanSize:15,pointLength:15},f=[{key:"pointLength",message:"pointLength value >= 5",limit:t=>t>=5},{key:"beanSize",message:"beanSize value >= 5",limit:t=>t>=5}],C={lineCap:"round",lineWidth:2,lineColors:["#d4d4d4","#06ab2d","#8a0303"],clockSize:15,clockGap:4,hLine:!0,mLine:!1,sLine:!0,textTime:""},b=[{key:"lineColors",message:"lineColors.length <= 3",limit:t=>t.length<=3}],P={charts:[w.ARC,w.RECT,w.TRIANGLE,w.HEART,w.POLYGON],chartColors:["#409EFF","#67C23A","#E6A23C","#F56C6C","#0960bd"],maxHeight:60,chartSize:12},E=[{key:"chartSize",message:"chartSize value 5-24",limit:t=>t>=5&&t<=24},{key:"delay",message:"Pattern.delay not allowed update",limit:t=>t===h().delay}],I={rollGap:12,childNum:4,rollSize:16,showChild:!0,chart:p.WHEEL,windmills:["#1ab3ea","#de6834","#30925d","#f48ea5"],windmillPointColor:"#f2c31f",fixad:!1},z=[{key:"childNum",message:"chartSize value 4-10",limit:t=>t>=4&&t<=10},{key:"delay",message:"Roll.delay not allowed update",limit:t=>t===h().delay}],k={src:"data:image/png;base64,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",width:52,height:52,turn:!0},R={skeletonColor:"rgb(240, 240, 240)",skeletonAnimationColor:"rgb(226, 226, 226)",radius:5,animation:!0,deep:!0,appoint:""},v={Gear:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.initOptions(c,x),this.optimization(this.options.textGap+this.options.lineEnd),this.initPoint(),this.aps=Array.from({length:this.options.lineNum},((t,i)=>i)),this.run(this.draw)}initPoint(){let t=this.options;this.ctx.lineCap=t.lineCap,this.ctx.lineWidth=t.lineWidth,this.ctx.save()}draw(){this.clearRect(),this.controller(),this.drawGear(),this.drawText()}controller(){this.options.direction?this.aps=this.aps.map((t=>t-1<=0?this.aps.length-1:t-1)):this.aps=this.aps.map((t=>t+1>this.aps.length?0:t+1))}drawGear(){let t=this.options;this.ctx.save(),this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur;for(let i=0;i<this.aps.length;i++)this.ctx.beginPath(),this.ctx.globalAlpha=this.aps[i]/10,this.ctx.moveTo(t.lineEndSkew,t.lineStart),this.ctx.lineTo(t.lineStartSkew,t.lineEnd),this.ctx.stroke(),this.ctx.closePath(),this.ctx.rotate(2*Math.PI/t.lineNum);this.ctx.restore()}drawText(){let t=this.options;this.ctx.save(),this.ctx.beginPath();let i=t.lineEnd+t.fontSize+t.textGap;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}optimization(t){this.options.optimization&&4*t>this.h&&(this.options.lineStart=this.h/6-5,this.options.lineEnd=this.h/6,this.options.textGap=2)}},Zoom:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.initOptions(m,g),this.initPoint(),this.zoomIndex=this.options.direction?0:this.options.zoomNum-1,this.list=Array.from({length:this.options.zoomNum},((t,i)=>Object.assign({value:this.options.lineWidth,state:0}))),this.run(this.draw)}initPoint(){let t=this.options;this.ctx.lineCap=t.lineCap,this.ctx.lineWidth=t.lineWidth,this.ctx.translate(-(t.lineWidth*(t.zoomNum+1)+t.zoomGap*(t.zoomNum+1))/2,-t.zoomHeight/2),this.ctx.save()}draw(){this.clearRect(),this.drawZoom(),this.drawText(),this.controller()}controller(){let t=this.options;t.direction&&this.zoomIndex>=t.zoomNum?this.zoomIndex=0:t.direction&&this.zoomIndex<0&&(this.zoomIndex=t.zoomNum-1)}drawZoom(){let t=this.options;for(let i=0;i<t.zoomNum;i++){1===this.list[i].state?this.list[i].value+=2:2===this.list[i].state&&this.list[i].value>=t.lineWidth&&this.list[i].value--,t.action===d.SCALE&&(this.ctx.lineWidth=this.list[i].value),i===this.zoomIndex&&(this.list[i].value>t.maxSize&&(this.list[i].state=2,t.direction?this.zoomIndex++:this.zoomIndex-1>=0?this.zoomIndex--:this.zoomIndex=t.zoomNum-1),this.list[i].value<=t.lineWidth&&(this.list[i].state=1)),this.ctx.beginPath(),t.zoomColors.length>0&&t.zoomColors[i]?this.ctx.strokeStyle=t.zoomColors[i]:this.ctx.strokeStyle=t.themeColor;let e=0,s=t.zoomHeight;t.action!==d.HEIGHT&&t.action!==d.WAVE||(e=-this.list[i].value),t.action===d.WAVE&&(s=-this.list[i].value),this.ctx.moveTo((i+1)*(t.lineWidth+t.zoomGap),e),this.ctx.lineTo((i+1)*(t.lineWidth+t.zoomGap),s),this.ctx.stroke(),this.ctx.closePath()}}drawText(){let t=this.options;this.ctx.save(),this.ctx.beginPath();let i=t.fontSize+t.maxSize;this.ctx.fillText(t.text,(t.lineWidth*(t.zoomNum+1)+t.zoomGap*(t.zoomNum+1))/2,i),this.ctx.closePath(),this.ctx.restore()}},Ring:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.rotate=10,this.initOptions(u,S),this.initPoint(),this.run(this.draw)}initPoint(){let t=this.options;this.ctx.lineCap=t.lineCap,this.ctx.lineWidth=t.lineWidth,this.ctx.save()}draw(){this.clearRect(),this.controller(),this.drawText()}controller(){this.ctx.save();let t=this.options,i=this.rotate*Math.PI/180*(t.direction?1:-1);this.ctx.rotate(i),this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur;for(let i=1;i<=t.ringNum;i++)this.drawRing(t.radius+(i-1)*t.ringGap,t.arcGap,t.ringsTurn&&t.ringsTurn.length>0?t.ringsTurn[i-1]:Math.PI/i);this.rotate+=t.turn,this.ctx.restore()}drawText(){let t=this.options;this.ctx.save(),this.ctx.beginPath();let i=t.ringNum*(t.radius+t.ringGap)+t.textGap;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}drawRing(t,i=1,e=0){this.ctx.beginPath(),this.ctx.arc(0,0,t,i+e,Math.PI+e),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.ctx.arc(0,0,t,Math.PI+i+e,e),this.ctx.stroke(),this.ctx.closePath()}},Bean:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.initOptions(A,f),this.bean={turn:30,state:1,beanState:1,nowX:-this.options.pointLength*this.options.beanSize/2-3*this.options.beanSize,beans:Array.from({length:this.options.pointLength},(()=>1)),beanAnimaIndex:0},this.run(this.draw)}draw(){let t=this.options;this.clearRect(),this.ctx.save(),this.ctx.beginPath(),this.ctx.translate(this.bean.nowX,0),this.ctx.arc(0,0,t.beanSize,(360-this.bean.turn)*Math.PI/180,this.bean.turn*Math.PI/180,!0),this.ctx.lineTo(0,0),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore(),this.drawPoint(),this.drawFillter(),this.drawText(),this.controller()}controller(){let t=this.options;this.bean.nowX>=t.pointLength*t.beanSize/2+2*t.beanSize&&(this.bean.nowX=-t.pointLength*t.beanSize/2-3*t.beanSize,this.bean.beanAnimaIndex=0),this.bean.nowX<=-t.pointLength*t.beanSize/2&&(this.bean.beanState=2),this.bean.turn<=0&&(this.bean.state=2),this.bean.turn>=30&&(this.bean.state=1),1===this.bean.state&&(this.bean.turn-=8),2===this.bean.state&&(this.bean.turn+=8),1===this.bean.beanState&&(this.bean.nowX-=t.beanSize/3),2===this.bean.beanState&&(this.bean.nowX+=t.beanSize/3)}drawPoint(){let t=this.options;this.ctx.save(),this.setShadow(),this.ctx.translate(-t.pointLength*t.beanSize/2,0);for(let i=0;i<t.pointLength&&i<this.bean.beanAnimaIndex;i++)this.ctx.beginPath(),i<this.bean.beanAnimaIndex&&this.ctx.arc(t.beanSize*i,0,t.beanSize/4,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath();this.bean.beanAnimaIndex++,this.ctx.restore()}drawFillter(){let t=this.options;this.clearRect(-t.beanSize/3+this.bean.nowX,-t.beanSize/2,t.beanSize/4),this.clearRect(-t.pointLength*t.beanSize/2-t.beanSize/2,-this.h,this.bean.nowX+t.pointLength*t.beanSize/2-t.beanSize/2,2*this.h),this.clearRect(-t.pointLength*t.beanSize/2,-this.h,-180,2*this.h),this.clearRect(t.pointLength*t.beanSize/2,-this.h,180,2*this.h)}setShadow(){let t=this.options;this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur}drawText(){let t=this.options;this.ctx.save(),this.ctx.beginPath();let i=t.fontSize+t.textGap+t.beanSize;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}},Clock:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.initOptions(C,b),this.initPoint(),this.nowTime=-1,this.nowS=0,this.run(this.draw)}initPoint(){let t=this.options;this.ctx.lineCap=t.lineCap,this.ctx.lineWidth=t.lineWidth,this.ctx.save()}draw(){this.clearRect(),this.drawClock()}drawText(t,i,e){let s=this.options;this.ctx.save(),this.ctx.beginPath();let o=2*s.clockSize+s.textGap;"time"===s.textTime&&(s.text=`${t} : ${i} : ${e}`),"s"===s.textTime&&(s.text=this.nowTime+"s"),this.ctx.fillText(s.text,0,o),this.ctx.closePath(),this.ctx.restore()}drawClock(){let t=this.options,i=(new Date).getSeconds(),e=(new Date).getMinutes(),s=(new Date).getHours();this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.moveTo(-5,-(t.clockSize+t.clockGap)),this.ctx.lineTo(5,-(t.clockSize+t.clockGap)),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.setShadow(),this.ctx.arc(0,0,t.clockSize,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore(),this.ctx.save();for(let i=0;i<12;i++)this.ctx.beginPath(),this.ctx.rotate(30*Math.PI/180),this.ctx.moveTo(t.clockSize-t.clockGap,0),this.ctx.lineTo(t.clockSize-t.clockGap,0),this.ctx.stroke(),this.ctx.closePath();this.ctx.restore(),t.hLine&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.lineWidth=1.6*t.lineWidth,t.lineColors[0]&&(this.ctx.strokeStyle=t.lineColors[0]),this.ctx.rotate(-90*Math.PI/180),this.ctx.rotate(360*s/60*Math.PI/180),this.ctx.moveTo(-1,0),this.ctx.lineTo(t.clockSize/2,0),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()),t.mLine&&(this.ctx.save(),this.ctx.beginPath(),t.lineColors[1]&&(this.ctx.strokeStyle=t.lineColors[1]),this.ctx.lineWidth=1.2*t.lineWidth,this.ctx.rotate(-90*Math.PI/180),this.ctx.rotate(360*e/60*Math.PI/180),this.ctx.moveTo(-1,0),this.ctx.lineTo(t.clockSize/2+t.clockGap,0),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()),t.sLine&&(this.ctx.save(),this.ctx.beginPath(),t.lineColors[2]&&(this.ctx.strokeStyle=t.lineColors[2]),this.ctx.rotate(-90*Math.PI/180),this.ctx.rotate(360*i/60*Math.PI/180),this.ctx.moveTo(-1,0),this.ctx.lineTo(t.clockSize-t.clockGap,0),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore(),this.nowS!==i&&this.nowTime++,this.nowS=i),this.drawText(s,e,i)}setShadow(){let t=this.options;this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur}},Pattern:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.initOptions(P,E),this.initPoint(),this.options,this.pattern={color:this.randomState("chartColors"),nowHeight:10,chart:this.randomState("charts"),shadow:0,nowSatate:1,turn:0},this.run(this.draw)}initPoint(){this.options.delay=10}draw(){let t=this.options;this.clearRect(),this.ctx.save(),this.ctx.beginPath(),this.ctx.translate(0,this.pattern.nowHeight),this.ctx.rotate(this.pattern.turn/Math.PI*2),this.ctx.fillStyle=this.pattern.color,this.selectChart(0,0,t.chartSize),this.ctx.closePath(),this.ctx.restore(),this.drawShadow(),this.clearRect(-this.w,0,2*this.w,this.h),this.controller(t),this.drawText(t)}controller(t){this.pattern.turn+=10,1===this.pattern.nowSatate?(this.pattern.nowHeight--,this.pattern.shadow+=.2):2===this.pattern.nowSatate&&(this.pattern.nowHeight++,this.pattern.shadow-=.2),this.pattern.shadow=Math.floor(100*this.pattern.shadow)/100,this.pattern.nowHeight<=-t.chartSize&&this.pattern.nowHeight%8==0&&(t.delay+=.5,t.delay=Math.floor(100*t.delay)/100),this.pattern.nowHeight<=-t.maxHeight?this.pattern.nowSatate=2:this.pattern.nowHeight>=t.chartSize&&(this.pattern.nowSatate=1,t.delay=10,this.pattern.chart=this.randomState("charts"),this.pattern.color=this.randomState("chartColors"))}selectChart(t,i,e){switch(this.pattern.chart){case w.RECT:this.drawRect(t,i,e);break;case w.ARC:this.drawArc(t,i,e);break;case w.TRIANGLE:this.drawTriangle(t,i,e);break;case w.HEART:this.drawHeart(t,i,e);break;case w.POLYGON:this.drawPolygon(t,i,e)}}randomState(t){let i=this.options;return i[t][parseInt(String(Math.random()*i[t].length))]}drawText(t){this.ctx.save(),this.ctx.beginPath(),this.ctx.fillStyle=this.pattern.color;let i=t.fontSize+t.textGap;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}drawShadow(){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.globalAlpha=.2,this.ctx.strokeStyle=this.pattern.color,this.ctx.moveTo(-this.pattern.shadow/2,0),this.ctx.lineTo(this.pattern.shadow,0),this.ctx.stroke(),this.ctx.beginPath(),this.ctx.restore()}drawRect(t,i,e){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.translate(-e/2,-e/2),this.ctx.fillRect(t,i,e,e),this.ctx.closePath(),this.ctx.restore()}drawArc(t,i,e){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.arc(t,i,e/2,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()}drawTriangle(t,i,e){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.translate(-e/2,-e/2*Math.sqrt(3)/2),this.ctx.moveTo(t,i),this.ctx.lineTo(e,0),this.ctx.lineTo(e/2,e/2*Math.sqrt(3)),this.ctx.lineTo(t,i),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()}drawHeart(t,i,e){e/=2,this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.translate(0,-2*e/2),this.ctx.moveTo(t,i),this.ctx.bezierCurveTo(e/2,-e,3*e,-e/2,i,2*e),this.ctx.moveTo(t,i),this.ctx.bezierCurveTo(-e/2,-e,3*-e,-e/2,i,2*e),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()}drawPolygon(t,i,e){this.ctx.save(),this.ctx.beginPath(),this.setShadow(),this.ctx.translate(-e/2,-e/2),this.ctx.moveTo(t,i),this.ctx.lineTo(e,i),this.ctx.lineTo(e+e/2,e/2),this.ctx.lineTo(e,e/2+e/2),this.ctx.lineTo(t,e),this.ctx.lineTo(t-e/2,e-e/2),this.ctx.lineTo(t,i),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()}setShadow(){let t=this.options;this.ctx.shadowColor=this.pattern.color,this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur}},Roll:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.initOptions(I,z),this.Roll={turn:1,nowX:this.options.fixad?0:this.options.childNum/2*(this.options.rollSize+this.options.rollGap)+this.options.rollGap/2,state:2,child:[]},this.run(this.draw)}draw(){this.clearRect(),this.drawGround(),this.drawChild(),this.ctx.save(),this.ctx.beginPath(),this.ctx.translate(-this.Roll.nowX,0),this.ctx.rotate(this.Roll.turn*Math.PI/180),this.selectChart(),this.controller(),this.ctx.restore(),this.drawText()}selectChart(){switch(this.options.chart){case p.RECT:this.drawRect();break;case p.WHEEL:this.drawWheel();break;case p.WINDMILL:this.drawWindmill()}}controller(){let t=this.options;if(1===this.Roll.state&&(this.Roll.turn-=10,t.delay<20&&!t.fixad&&(t.delay+=2)),2===this.Roll.state&&(this.Roll.turn+=10,t.delay>10&&!t.fixad&&(t.delay-=5)),t.fixad)return;this.Roll.nowX<=-t.childNum/2*(t.rollSize+t.rollGap/1.6)&&(this.Roll.state=1),this.Roll.nowX>=t.childNum/2*(t.rollSize+t.rollGap)+t.rollGap/2&&(this.Roll.state=2),1===this.Roll.state&&this.Roll.nowX++,2===this.Roll.state&&this.Roll.nowX--;let i=this.Roll.child;this.Roll.nowX%(t.rollSize+t.rollGap)==0&&2===this.Roll.state&&i.push({turn:this.Roll.turn,x:this.Roll.nowX}),1===this.Roll.state&&i[i.length-1]&&i[i.length-1].x===this.Roll.nowX&&this.Roll.child.pop()}drawRect(){let t=this.options;this.ctx.save(),this.setShadow(),this.ctx.translate(-t.rollSize/2,-t.rollSize/2),this.ctx.fillRect(0,0,t.rollSize,t.rollSize),this.ctx.restore()}drawWheel(){let t=this.options;this.ctx.save(),this.ctx.lineWidth=4,this.ctx.beginPath(),this.ctx.arc(0,0,t.rollSize/6,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.ctx.arc(0,0,t.rollSize/2,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.ctx.arc(0,0,t.rollSize,0,2*Math.PI),this.ctx.stroke(),this.ctx.closePath();for(let i=0;i<6;i++)this.ctx.beginPath(),this.ctx.moveTo(0,t.rollSize/2),this.ctx.lineTo(0,t.rollSize),this.ctx.stroke(),this.ctx.rotate(60*Math.PI/180),this.ctx.closePath();this.ctx.restore()}drawWindmill(){let t=this.options;this.ctx.save();for(let i=0;i<t.windmills.length;i++)this.ctx.beginPath(),this.ctx.fillStyle=t.windmills[i],this.ctx.arc(-t.rollSize/2,0,t.rollSize,0,Math.PI),this.ctx.fill(),this.ctx.closePath(),this.ctx.rotate(90*Math.PI/180);this.ctx.beginPath(),this.ctx.fillStyle=t.windmillPointColor,this.ctx.arc(0,0,t.rollSize/2,0,2*Math.PI),this.ctx.fill(),this.ctx.restore()}drawChild(){this.options.showChild&&this.Roll.child.forEach(((t,i)=>{this.ctx.save(),this.ctx.translate(-t.x,0),this.ctx.globalAlpha=(i+1)/10,this.ctx.rotate(t.turn*Math.PI/180),this.selectChart(),this.ctx.restore()}))}drawGround(){let t=this.options;t.chart===p.WHEEL&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.lineWidth=3,this.ctx.globalAlpha=.03,this.ctx.moveTo(-t.childNum/2*(t.rollSize+t.rollGap/1.6),t.rollSize+3),this.ctx.lineTo(t.childNum/2*(t.rollSize+t.rollGap)+t.rollGap/2,t.rollSize+3),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore())}drawText(){let t=this.options;this.ctx.save(),this.ctx.beginPath();let i=t.fontSize+t.textGap+t.rollSize;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}setShadow(){let t=this.options;this.ctx.shadowOffsetX=t.shadowOffsetX,this.ctx.shadowOffsetY=t.shadowOffsetY,this.ctx.shadowBlur=t.shadowBlur}},Img:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.initOptions(k,[]),this.img=new Image,this.img.src=this.options.src,this.turn=10,this.img.onload=()=>{this.run(this.draw)}}draw(){this.clearRect(),this.drawImg(),this.drawText()}drawImg(){let t=this.options;this.ctx.save(),t.turn&&this.ctx.rotate(this.turn*Math.PI/180),this.ctx.drawImage(this.img,-t.width/2,-t.height/2,t.width,t.height),this.ctx.closePath(),this.ctx.restore(),this.turn+=10}drawText(){let t=this.options;this.ctx.save(),this.ctx.beginPath();let i=t.fontSize+t.textGap+t.height/2;this.ctx.fillText(t.text,0,i),this.ctx.closePath(),this.ctx.restore()}},Skeleton:class extends r{constructor(t,i,e,s,o){super(t,i,e,s,o),this.initOptions(R,[]),this.skeleton=[],this.colorFlow=0,this.state=1,this.WL_IMG="wl-img",this.initPoint(),this.controller(this.store.element.children),this.run(this.draw)}initPoint(){let t=this.options;this.ctx.translate(-this.w/2,-this.h/2),this.canvas.width=this.store.element.scrollWidth,this.canvas.height=this.store.element.scrollHeight,this.ctx.fillStyle=t.skeletonColor}draw(){this.clearRect(),this.drawSkeleton()}controller(t){let i=this.options;for(let e of Array.from(t))this.store.loadingId!==e.id&&(i.appoint.length>0&&null===e.getAttribute(i.appoint)||(i.deep?e.children.length<=0?this.skeleton.push({title:e.nodeName,element:e}):this.controller(e.children):this.skeleton.push({title:e.nodeName,element:e})))}drawSkeleton(){let t=this.options,i=this.ctx.createLinearGradient(0,0,this.w,this.h);i.addColorStop(0,t.skeletonColor),i.addColorStop(this.colorFlow,t.skeletonAnimationColor),i.addColorStop(1,t.skeletonColor),t.animation&&(this.ctx.fillStyle=i),this.skeleton.forEach((i=>{let e=i.element;this.drowRadiusRect(e.offsetLeft,e.offsetTop,e.offsetWidth,e.offsetHeight,t.radius),this.ctx.fill()})),t.animation&&(this.colorFlow>=.9&&(this.state=2),this.colorFlow<=.1&&(this.state=1),1===this.state&&(this.colorFlow+=.06),2===this.state&&(this.colorFlow-=.06))}}};function y(t,i,e,s,o){try{let h=null;h=s.custom?new s.custom(t,i,e,s,o.element.$store):new v[s.model](t,i,e,s,o.element.$store),o.model=h}catch(t){a.error("draw error("+t+")")}}class T{constructor(t){this.options=Object.assign(h(),t),this.canvas=null,this.loadingId=null,this.element=null,this.hooks=null}resize(t,i){i.width=t.clientWidth,i.height=t.clientHeight,t.$store&&y(i.offsetWidth,i.offsetHeight,i,this.options,t.$store)}close(i,s){let o=this.options,h=i.$store;this.clearStyle(i,s),o.type!==t.DOM||o.pointerEvents||(i.style.pointerEvents="auto"),h&&(h.model=null,this.callEvent(e.BEFORE_COLSE),h.animationId&&l(h.animationId)),window.setTimeout((()=>{o.type!==t.DOM?i.remove():s.remove(),this.loadingId=null,this.callEvent(e.COLSED),this.hooks=this.initHooksCall()}),o.delayColse)}init(){return this.canvas=document.createElement("canvas"),this.hooks=this.initHooksCall(),this.loadingId=String("wl_"+Date.now()),{canvas:this.canvas,hooks:this.hooks,loadingId:this.loadingId}}clearStyle(i,e){e.style.opacity="0",this.options.type!==t.DOM&&(i.style.boxShadow="none")}initCanvasStyle(i,e,s){let o=this.options,h=i.clientWidth,a=i.clientHeight,n=window.getComputedStyle(i),l=i.style,r=s.style;i.loadingId=e,o.type!==t.DOM||o.pointerEvents||(i.style.pointerEvents="none"),n.position&&"static"!==n.position||(l.position="relative"),s.id=e,document.styleSheets[0].insertRule("\n@keyframes wl_show {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n"),s.style.animation=`wl_show ${o.delayColse/1e3}s linear`,r.position="absolute",r.left=`${o.pointerEvents?0:i.scrollLeft}px`,r.top=`${o.pointerEvents?0:i.scrollTop}px`,r.zIndex=o.zIndex,r.transition=o.delayColse/1e3+"s",r.backgroundColor=o.bgColor,r.borderRadius=n.borderRadius,s.width=h,s.height=a,i.append(s),this.element=i}draw(t){let i=this.init();if(this.initCanvasStyle(t,i.loadingId,i.canvas),this.initStore(t,i.hooks),t.$store){let e=i.canvas;y(e.offsetWidth,e.offsetHeight,e,this.options,t.$store)}else a.error("WebLoading:canvas or ctx null")}initStore(t,i){t.$store={options:this.options,element:t,animationId:void 0,loadingId:this.loadingId,model:null,hookCall:this.initStoreHooksCall(i)}}initHooksCall(){return{[e.BEFORE_COLSE]:[],[e.COLSED]:[]}}initStoreHooksCall(t){return{[e.BEFORE_COLSE]:i=>{t[e.BEFORE_COLSE].push(i)},[e.COLSED]:i=>{t[e.COLSED].push(i)}}}callEvent(t){this.hooks&&this.hooks[t].forEach((t=>{t()}))}}let O=document;class L{constructor(t){this.options=t,this.extendEl=this.initStyle()}initStyle(){this.extendEl=document.createElement("div");let i=this.options,e="100vw",s="100vh",o="0px";return i&&(this.extendEl.classList.add("wl_"+(i.miniClass||"loading")),i.type===t.MINI&&(e="180px",s="160px",o="10px"),this.extendEl.style.cssText=`\n          position:fixed;\n          width:${e};\n          height:${s};\n          top:50%;\n          left:50%;\n          transform:translate(-50%, -50%);\n          border-radius: ${o};\n          z-index: ${i.zIndex};\n          box-shadow:\n          2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),\n          6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),\n          12.5px 12.5px 10px rgba(0, 0, 0, 0.035),\n          22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),\n          41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),\n          100px 100px 80px rgba(0, 0, 0, 0.07)\n          ;\n      `),O.body.appendChild(this.extendEl),this.extendEl}getElement(){return this.extendEl}}function M(i){let e=new T(i);return{loading:(i,s)=>{let o=Object.assign(e.options,s);e.loadingId||(o.type!==t.DOM&&(i=new L(o).getElement()),i?e.draw(i):a.error("loading函数未找到HTMLElement元素!"))},resize:()=>{e.element&&e.canvas&&e.resize(e.element,e.canvas)},close:()=>{e.element&&e.canvas&&e.close(e.element,e.canvas)},update:t=>{let i=e.canvas,s=Object.assign(e.options,t),o=e.element;i&&s&&o&&o.$store&&y(i.offsetWidth,i.offsetHeight,i,s,o.$store)},getOptions:()=>e.options,getLoadingId:()=>e.loadingId}}function G(t,i){return M(Object.assign(h(),i||{},{type:t}))}let N=window;N.BaseModel=r,N.initLoading=function(t){return M(t)},N.miniLoading=i=>G(t.MINI,i),N.fullLoading=i=>G(t.FULL,i)})();