"use strict";(self.webpackChunkugonf=self.webpackChunkugonf||[]).push([[876],{7876:function(e,t,n){n.r(t);var u,a=n(6771),o=n(7294),i=n(5965),c=n.n(i),l=n(2355),r=n(3431);var s=(0,a.Z)("video",{target:"e1o82y260"})({name:"1gyeick",styles:"background-color:#000;width:640px;height:480px"});t.default=function(){var e=(0,o.useState)(new(c())(l.O)),t=e[0],n=e[1],a=(0,o.useState)(""),i=a[0],d=a[1],f=[(0,r.tZ)("option",{value:"null",key:-1},"null")],v=(0,o.useState)(f),h=v[0],p=v[1],g=(0,o.useState)(""),Z=g[0],k=g[1],b=(0,o.useRef)(null);(0,o.useEffect)((function(){t.on("open",d),t.on("call",(function(e){e.answer(u,{videoCodec:"VP9"})}))}),[t]);(0,o.useEffect)((function(){navigator.mediaDevices.enumerateDevices().then((function(e){var t=[],n=[],u=[];e.forEach((function(e,a){var o=e.label,i=e.deviceId,c=(0,r.tZ)("option",{value:i,key:a},o);switch(e.kind){case"audioinput":t.push(c);break;case"audiooutput":n.push(c);break;case"videoinput":u.push(c)}})),p(u)})).catch(console.error)}),[]);return(0,o.useEffect)((function(){var e={audio:!1,video:{deviceId:Z,frameRate:30,height:480,width:640}};navigator.mediaDevices.getUserMedia(e).then((function(e){u=e,b.current&&(b.current.srcObject=e)})).catch(console.error)}),[Z]),(0,r.tZ)(o.Fragment,null,(0,r.tZ)("div",null,(0,r.tZ)(s,{autoPlay:!0,muted:!0,playsInline:!0,ref:b})),(0,r.tZ)("div",null,(0,r.tZ)("span",null,"Video Input: "),(0,r.tZ)("select",{onChange:function(e){!function(e,t){var n=e.target,u=n.selectedIndex;t(n.options[u].value)}(e,k)}},h)),(0,r.tZ)("div",null,(0,r.tZ)("span",null,"Peer ID: ",i)),(0,r.tZ)("div",null,(0,r.tZ)("button",{onClick:function(){t.destroy(),n(new(c())(i,l.O))}},"GoStream")))}}}]);
//# sourceMappingURL=876-995b0c1cd78eead8ba34.js.map