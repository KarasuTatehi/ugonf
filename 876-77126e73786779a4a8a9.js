"use strict";(self.webpackChunkugonf=self.webpackChunkugonf||[]).push([[876],{7876:function(e,t,n){n.r(t);var a,u=n(6771),o=n(7294),i=n(5965),c=n.n(i),r=n(2355),l=n(3431);var s=(0,u.Z)("video",{target:"e1o82y260"})({name:"1syqbme",styles:"background-color:#000;width:1280px;height:720px"});t.default=function(){var e=(0,o.useState)(),t=e[0],n=e[1],u=(0,o.useState)(""),i=u[0],d=u[1],f=[(0,l.tZ)("option",{value:"null",key:0},"null")],v=(0,o.useState)("Start"),p=v[0],h=v[1],Z=(0,o.useState)(f),g=Z[0],k=Z[1],b=(0,o.useState)(""),w=b[0],y=b[1],S=(0,o.useRef)(null);(0,o.useEffect)((function(){t&&(t.on("open",d),t.on("call",(function(e){e.answer(a,{videoCodec:"VP9"})})))}),[t]);(0,o.useEffect)((function(){navigator.mediaDevices.enumerateDevices().then((function(e){var t=[],n=[],a=[];e.forEach((function(e,u){var o=e.label,i=e.deviceId,c=(0,l.tZ)("option",{value:i,key:u},o);switch(e.kind){case"audioinput":t.push(c);break;case"audiooutput":n.push(c);break;case"videoinput":a.push(c)}})),k(a)})).catch(console.error)}),[]);(0,o.useEffect)((function(){var e;navigator.mediaDevices.getUserMedia((e=w,""===e?{audio:!1,video:!1}:{audio:!1,video:{deviceId:e,frameRate:30,height:720,width:1280}})).then((function(e){a=e,S.current&&(S.current.srcObject=e)})).catch(console.error)}),[w]);return(0,l.tZ)(o.Fragment,null,(0,l.tZ)("div",null,(0,l.tZ)(s,{autoPlay:!0,muted:!0,playsInline:!0,ref:S})),(0,l.tZ)("div",null,(0,l.tZ)("span",null,"Video Input: "),(0,l.tZ)("select",{onChange:function(e){!function(e,t){var n=e.target,a=n.selectedIndex;t(n.options[a].value)}(e,y)}},g)),(0,l.tZ)("div",null,(0,l.tZ)("span",null,"Peer ID: "),(0,l.tZ)("input",{onClick:function(e){navigator.clipboard.writeText(location.href+"send/?peerId="+i)},readOnly:!0,type:"text",value:i})),(0,l.tZ)("div",null,(0,l.tZ)("button",{onClick:function(){switch(p){case"Start":n(t?new(c())(i,r.O):new(c())(r.O)),h("Stop");break;case"Stop":if(!t)return;t.destroy(),h("Start")}}},p)))}}}]);
//# sourceMappingURL=876-77126e73786779a4a8a9.js.map