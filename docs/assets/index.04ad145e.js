import{o as e,c as t,r as o,w as s,a as r,b as n,d as a,e as d,V as i}from"./vendor.6c52f4de.js";const p={};let c;p.render=function(s,r){const n=o("router-view");return e(),t(n)};const l={},u=function(e,t){if(!t||0===t.length)return e();if(void 0===c){const e=document.createElement("link").relList;c=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if((e=`/store-app/${e}`)in l)return;l[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":c,t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((e,t)=>{s.addEventListener("load",e),s.addEventListener("error",t)})):void 0}))).then((()=>e()))};var m={name:"",setup:()=>({})};const h=s("data-v-b04db4ba")(((o,s,r,n,a,d)=>(e(),t("div",null,"xxxxx"))));m.render=h,m.__scopeId="data-v-b04db4ba";const _=[{path:"/",name:"Home",component:m,redirect:"/goods"},{path:"/goods",name:"Goods",component:()=>u((()=>import("./List.0989ef13.js")),["assets/List.0989ef13.js","assets/List.1054eb94.css","assets/index.3021b329.js","assets/vendor.6c52f4de.js"])},{path:"/goods/detail",name:"GoodsDetail",props:e=>({id:e.query.id}),component:()=>u((()=>import("./Detail.a1eb14b0.js")),["assets/Detail.a1eb14b0.js","assets/Detail.4c097843.css","assets/index.3021b329.js","assets/vendor.6c52f4de.js"])}],f=r({history:n("/store-app/"),routes:_});var v=a({state:{},mutations:{},actions:{},modules:{}});d(p).use(v).use(f).use(i).mount("#app"),console.log("production");