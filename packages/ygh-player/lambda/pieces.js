!function(e,n){for(var t in n)e[t]=n[t]}(exports,function(e){var n={};function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(i,a,function(n){return e[n]}.bind(null,a));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([,function(e,n,t){"use strict";t.r(n),t.d(n,"handler",function(){return y});t(2);function i(e,n,t,i,a,r,o){try{var l=e[r](o),s=l.value}catch(e){return void t(e)}l.done?n(s):Promise.resolve(s).then(i,a)}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},i=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.forEach(function(n){r(e,n,t[n])})}return e}function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}const l=new Date(2018,10,6),s=new Date(2018,10,22),u=e=>()=>e,d=e=>n=>e.every(e=>n.includes(e)),c=e=>(n,t)=>t.filter(n=>e.includes(n.id)).every(e=>e.challenge.completed),g=e=>()=>Date.now()+864e5*e>s,p=e=>n=>"string"==typeof n&&n.toLowerCase()===e,f=[{id:0,image:"/images/animal_farm.jpeg",isAvailable:u(!0),challenge:{type:"question",question:"Even een makkelijke om mee te beginnen: Wat is jouw favoriete kleur?",validateResponse:p("geel")}},{id:1,image:"/images/fry.jpeg",isAvailable:c([0]),challenge:{type:"question",question:'\n        Volgens mij snap je het! Nu wat moeilijker...\n        "Ik heb een groen huis.\n        In mijn groene huis zit een wit huis.\n        In mijn witte huis zit een rood huis.\n        In mijn rode huis zitten een hele hoop baby\'s.\n        Wat ben ik?"\n      ',validateResponse:p("watermeloen")}},{id:2,image:"/images/artichoke.jpeg",isAvailable:d(["ofgG59w4"]),challenge:{type:"none"}},{id:3,image:"/images/leisteen.jpeg",isAvailable:(e,n)=>(e=>()=>Date.now()-864e5*e>l)(2)()&&c([2])(e,n),challenge:{type:"question",question:"Hoe spel je Amsterdam met 7 letters?",validateResponse:e=>"string"==typeof e&&(e.toLowerCase().includes("cirkel")||e.toLowerCase().includes("rond"))}},{id:4,image:"/images/disney_1.jpeg",isAvailable:d(["7uciossJ"]),challenge:{type:"none"}},{id:5,image:"/images/disney_2.jpeg",isAvailable:u(!0),challenge:{type:"code",code:"7291"}},{id:6,image:"/images/pie.jpeg",isAvailable:u(!0),challenge:{type:"plant",validateResponse:p("qroiuqpinvrin")}},{id:7,image:"/images/disney_3.jpeg",isAvailable:d(["cOW0bvGG"]),challenge:{type:"none"}},{id:8,image:"/images/disney_4.jpeg",isAvailable:u(!0),challenge:{type:"question",question:"Je staat in een kamer met 2 deuren en 2 bewakers. Achter een van de deuren is vrijheid en achter de andere deur de dood. Een van de bewakers liegt altijd, de andere vertelt altijd de waarheid. Je moet een deur openen, maar je mag maar 1 vraag stellen aan 1 van de bewakers. Wat vraag je zodat je de goede deur kan kiezen?",validateResponse:e=>"string"==typeof e&&e.toLowerCase().includes("ander")&&(e.toLowerCase().includes("waarheen")||e.toLowerCase().includes("waarnaar")||e.toLowerCase().includes("wat"))}},{id:9,image:"/images/disney_5.jpeg",isAvailable:d(["s1Y8LINb"]),challenge:{type:"none"}},{id:10,image:"/images/soup.jpeg",isAvailable:(e,n)=>d(["VZ5zlRz6"])(e,n)&&c([11])(e,n),challenge:{type:"question",question:"Noem 4 belangrijke ingredienten van goed eten",validateResponse:e=>{if("string"!=typeof e)return!1;const n=e.toLowerCase();return(n.includes("salt")||n.includes("zout"))&&(n.includes("fat")||n.includes("vet"))&&(n.includes("acid")||n.includes("zuur"))&&(n.includes("heat")||n.includes("hitte"))}}},{id:11,image:"/images/disney_6.jpeg",isAvailable:d(["VZ5zlRz6"]),challenge:{type:"none"}},{id:12,image:"/images/disney_7.jpeg",isAvailable:d(["xN56rM9e"]),challenge:{type:"none"}},{id:13,image:"/images/disney_8.jpeg",isAvailable:g(3),challenge:{type:"question",question:"Waar gaan we heen?",validateResponse:p("disneyland parijs")}},{id:14,image:"/images/disney_9.jpeg",isAvailable:g(1),challenge:{type:"question",question:"Heb je er zin in?",validateResponse:e=>"string"==typeof e&&e.toLowerCase().includes("ja")}}],m=(e,n)=>{let{type:t}=e,i=o(e,["type"]);switch(t){case"question":case"plant":return((e,n)=>{let{validateResponse:t}=e;return a({},o(e,["validateResponse"]),{completed:t(n?n.response:null)})})(i,n);case"code":return((e,n)=>{let{code:t}=e;return a({},o(e,["code"]),{length:t.length,completed:n&&n.response===t})})(i,n);default:return{completed:!0}}},y=function(){var e=function(e){return function(){var n=this,t=arguments;return new Promise(function(a,r){var o=e.apply(n,t);function l(e){i(o,a,r,l,s,"next",e)}function s(e){i(o,a,r,l,s,"throw",e)}l(void 0)})}}(function*(e,n){if("POST"!==e.httpMethod)return{statusCode:405,body:"Method Not Allowed"};const{responses:t,codes:i}=JSON.parse(e.body);return{statusCode:200,body:JSON.stringify(((e,n)=>f.map(n=>{let{challenge:t}=n,i=o(n,["challenge"]);const r=e.find(e=>e.pieceId===i.id);return a({},i,{challenge:a({type:t.type},m(t,r))})}).filter((e,t,i)=>e.isAvailable(n,i)).map(e=>a({},e,{image:e.challenge.completed?e.image:null})))(t||[],i||[]))}});return function(n,t){return e.apply(this,arguments)}}()},function(e,n){e.exports=require("querystring")}]));