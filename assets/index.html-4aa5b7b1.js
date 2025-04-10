import{_ as H}from"./app-2e256883.js";import{_ as K,b as A,r as y,h as X,o as ee,L as te,M as le,p as d,q as _,Q as r,O as I,P as M,B as n,N as i,V as u,y as J,t as p,U as w,Z as ae,ab as oe,v as k}from"./framework-239de111.js";import{E as B,a as ne,b as j}from"./index-d70552bc.js";import{M as se,L as N,O as re}from"./enum-c67b0653.js";import{d as D,E as ie,a as G,b as ue,c as de,e as pe,f as me}from"./options-943fb04f.js";import{c as fe}from"./listData-9dae369c.js";import{E as S}from"./index-b9a1b5be.js";import"./index-a595ad36.js";const ce={class:"context"},ye={class:"list"},_e={class:"right"},ve={key:1,class:"options"},ge={class:"set"},ke={__name:"index.html",setup(be){let x=A([]),v=A([]),f=y(""),c=y("gg"),g=y(se.GEAR),b=y(N.DOM),C=y(null),m=null,T=!1,V=y(!0);const F=X(()=>{let a=v.filter(e=>e.form===c.value);return c.value==="model"&&(a=a.filter(e=>e.model===g.value)),a});q(),ee(()=>{H(()=>import("./web-loading.esm-bundler-90156e9f.js"),[]).then(a=>{m=initLoading(),V.value=!1,L()})});function L(){m.getLoadingId()||(m.loading(C.value,E()),b.value!==N.DOM&&setTimeout(m.close,(f.value||1)*1e3))}function Y(){m&&m.close()}function $(a,e){e.key==="model"&&(c.value="model",g.value=a.value),e.key==="type"&&(b.value=a.value),!T&&["bgColor","pointerEvents"].includes(e.key)&&(me({title:"提示",type:"warning",message:'部分公共options是用于初始化canvas,例如:"背景色"与"事件穿透",需要 重新加载 显示效果!'}),T=!0),m&&m.update(E())}function q(){for(let l=0;l<10;l++)x.push(Q());v=JSON.parse(JSON.stringify(D));let e=te().query.model;if(e){let l=fe.find(o=>o.model===e),t=v.find(o=>o.key==="model");if(t.value=e,g.value=e,l){let o=JSON.parse(JSON.stringify(l));v.filter(s=>s.form==="gg"||s.model===e).forEach(s=>{for(let[R,h]of Object.entries(o.options))O(s.type)&&s.key===R&&s.arrayAdd&&s.arrayItems&&h.length&&(s.arrayItems=[],h.forEach(Z=>{s.arrayItems.push(JSON.parse(JSON.stringify(s.arrayAdd,(z,U)=>{switch(z){case"key":return U+s.arrayItems.length;case"value":return Z;default:return U}})))})),s.key===R&&(s.value=h)})}}}function P(a){let e={},l=E();D&&l&&D.forEach(o=>{(!o.model&&l[o.key]&&l[o.key]!==o.value||a||o.model&&o.model===l.model&&(O(o.type)?l[o.key].join()!==o.value.join():l[o.key]!==o.value))&&(e[o.key]=l[o.key])});let t=document.createElement("input");t.value=JSON.stringify(e),document.body.appendChild(t),t.select(),document.execCommand("Copy"),t.remove(),j.success("复制成功!")}function E(){let a=v.filter(l=>l.model===g.value||l.form===re.GG),e={};return a.forEach(l=>{O(l.type)?e[l.key]=l.arrayItems.map(t=>t.value):e[l.key]=l.value}),e}function W(){let a=parseInt(f.value);(a<1||a>30)&&(j.warning("范围1-30秒"),f.value="")}function Q(){let a=new Date;return{id:parseInt(Math.random()*1e7),user:parseInt(Math.random()*1e7),value:parseInt(Math.random()*100),date:`${a.getFullYear()}${a.getMonth()-1}-${a.getDate()}`}}function O(a){return a&&a.includes("array_")}return(a,e)=>{const l=le("WebTypeInput");return d(),_("div",null,[r("div",ce,[r("div",{class:"left",ref_key:"leftRef",ref:C},[(d(!0),_(I,null,M(n(x),t=>(d(),w(n(de),{key:t.id},{default:u(()=>[r("div",ye,[r("span",null,[p(" id: "),r("b",null,k(t.id),1)]),r("span",null,[p(" user: "),r("b",null,k(t.user),1)]),r("span",null,[p(" value: "),r("b",null,k(t.value),1)]),r("span",null,[p(" date: "),r("b",null,k(t.date),1)])])]),_:2},1024))),128))],512),r("div",_e,[i(n(ne),{modelValue:n(c),"onUpdate:modelValue":e[0]||(e[0]=t=>J(c)?c.value=t:c=t),class:"demo-tabs"},{default:u(()=>[i(n(B),{label:"Public",name:"gg"}),i(n(B),{label:"model",name:"model"})]),_:1},8,["modelValue"]),n(V)?(d(),_(I,{key:0},M(10,t=>i(n(pe),{rows:1,animated:""})),64)):(d(),_("div",ve,[(d(!0),_(I,null,M(n(F),t=>(d(),w(l,{label:"key",key:t.key,modelValue:t.value,"onUpdate:modelValue":o=>t.value=o,options:t,onUpdate:o=>$(o,t)},null,8,["modelValue","onUpdate:modelValue","options","onUpdate"]))),128))])),r("div",ge,[i(n(S),{type:"primary",onClick:L},{default:u(()=>[p("loading")]),_:1}),n(b)===n(N).DOM?(d(),w(n(S),{key:0,type:"danger",onClick:Y},{default:u(()=>[p("close")]),_:1})):ae((d(),_("input",{key:1,type:"number",placeholder:"1秒关闭",onInput:W,"onUpdate:modelValue":e[1]||(e[1]=t=>J(f)?f.value=t:f=t)},null,544)),[[oe,n(f)]]),i(n(ue),null,{dropdown:u(()=>[i(n(ie),null,{default:u(()=>[i(n(G),{onClick:e[2]||(e[2]=t=>P())},{default:u(()=>[p("Modified part")]),_:1}),i(n(G),{onClick:e[3]||(e[3]=t=>P("all"))},{default:u(()=>[p("All Configuration")]),_:1})]),_:1})]),default:u(()=>[i(n(S),{type:"success"},{default:u(()=>[p("replication")]),_:1})]),_:1})])])])])}}},xe=K(ke,[["__scopeId","data-v-ad15bb11"],["__file","index.html.vue"]]);export{xe as default};
