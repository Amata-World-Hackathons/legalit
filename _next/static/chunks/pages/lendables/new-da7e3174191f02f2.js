(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[423],{1948:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/lendables/new",function(){return n(5382)}])},1051:function(e,t,n){"use strict";n.d(t,{$_:function(){return m}});var a=n(5893),r=n(4184),l=n.n(r),s=n(7536);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){i(e,t,n[t])}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function u(e,t){return function(n){var r=n.hint,i=n.name,u=n.label,d=n.inputId,m=n.className,h=n.wrapInput,b=n.registerOptions,x=n.showOptionalLabel,f=c(n,["hint","name","label","inputId","className","wrapInput","registerOptions","showOptionalLabel"]),j=(0,s.Gc)(),g=j.register,y=(0,j.getFieldState)(i).error,N=o({className:l()("input-bordered",t,{"input-error":!!y})},g(i,b),f),v=e(N);return(0,a.jsxs)("div",{className:l()("form-control",m),children:[(0,a.jsxs)("label",{htmlFor:d,className:"label",children:[u?(0,a.jsx)("span",{className:"label-text",children:u}):null,x?(0,a.jsx)("span",{className:"label-text",children:"(Optional)"}):null]}),h?(0,a.jsx)("label",{htmlFor:d,className:"input-group",children:h(v)}):v,y?(0,a.jsx)("label",{htmlFor:d,className:"label",children:(0,a.jsx)("span",{className:"label-text text-red-500",children:p(y)})}):r?(0,a.jsx)("label",{htmlFor:d,className:"label",children:(0,a.jsx)("span",{className:"label-text text-base-content text-xs",children:r})}):null]})}}var d=u((function(e){return(0,a.jsx)("input",o({},e))}),"input"),m=u((function(e){return(0,a.jsx)("textarea",o({},e))}),"textarea");function p(e){return e.message?e.message:e.message||"Invalid input"}t.ZP=d},9321:function(e,t,n){"use strict";n.d(t,{Di:function(){return l},Ph:function(){return r},iK:function(){return a}});var a="".concat("//legalit","/legalit-logo.jpg"),r="contracts-2",l="lendables-2"},5406:function(e,t,n){"use strict";n.d(t,{E:function(){return i}});var a=n(5893),r=(n(7294),n(7649)),l=n(1850),s=function(e){var t=e.children;return(0,a.jsx)(l.Kl,{children:(0,a.jsx)(r.b,{children:t})})};function i(e){return(0,a.jsx)(s,{children:e})}},5382:function(e,t,n){"use strict";n.r(t),n.d(t,{NewLendablePage:function(){return w}});var a=n(4051),r=n.n(a),l=n(5893),s=n(1664),i=n.n(s),o=n(7536),c=n(5406),u=n(9110),d=n(5321),m=n(4184),p=n.n(m),h=n(1051),b=n(1163),x=n(7294),f=n(1850),j=n(9655),g=n(9321);function y(e,t,n,a,r,l,s){try{var i=e[l](s),o=i.value}catch(c){return void n(c)}i.done?t(o):Promise.resolve(o).then(a,r)}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){N(e,t,n[t])}))}return e}var w=function(){var e,t=(0,u.CU)(),n=(0,b.useRouter)(),a=(0,f.aC)().user,s=(0,o.cI)({defaultValues:{name:"",contentUrl:"",contentType:"text",textContent:"",marketplaceImageUrl:"",monetizationOption:"singlePayment",oneTimeFee:"",description:"",legalTemplateId:"",subscriptionFee:""}}),c=s.watch,m=s.register,N=s.clearErrors,w=s.handleSubmit,O=s.formState.isSubmitting,k=(0,u.Lu)("templates"),P=c("contentType"),T=c("marketplaceImageUrl"),I=c("monetizationOption"),F=c("legalTemplateId"),E=null===(e=k.data)||void 0===e?void 0:e.find((function(e){return e.id===F}));return(0,x.useEffect)((function(){N("text"===P?"contentUrl":"textContent")}),[N,P]),(0,x.useEffect)((function(){N("singlePayment"===I?"subscriptionFee":"oneTimeFee")}),[N,I]),(0,l.jsxs)("div",{className:"w-full max-w-3xl m-auto",children:[(0,l.jsx)("div",{className:"prose dark:prose-invert",children:(0,l.jsx)("h1",{children:"New Lendable"})}),(0,l.jsx)(o.RV,v({},s,{children:(0,l.jsxs)("form",{onSubmit:w(function(){var e,l=(e=r().mark((function e(l){var s;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,d.ET)((0,d.hJ)(t,g.Di),v({},l,{userId:null===a||void 0===a?void 0:a.uid}));case 2:s=e.sent,n.push("/lendables/".concat(s.id));case 4:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(a,r){var l=e.apply(t,n);function s(e){y(l,a,r,s,i,"next",e)}function i(e){y(l,a,r,s,i,"throw",e)}s(void 0)}))});return function(e){return l.apply(this,arguments)}}()),children:[(0,l.jsxs)("section",{className:"mt-8 p-8 border border-primary rounded-lg",children:[(0,l.jsx)("h3",{className:"text-lg",children:"Content"}),(0,l.jsx)(h.ZP,{className:"max-w-sm",name:"name",label:"Display name",autoComplete:"off",registerOptions:{required:{value:!0,message:"A name must be provided"}}}),(0,l.jsx)("div",{className:"mt-4 form-control",children:(0,l.jsxs)("label",{className:"label cursor-pointer justify-start",children:[(0,l.jsx)("input",v({type:"radio",value:"text",className:"radio checked:bg-primary"},m("contentType"))),(0,l.jsx)("span",{className:"ml-3 label-text",children:"Text"})]})}),(0,l.jsx)("div",{className:"form-control",children:(0,l.jsxs)("label",{className:"label cursor-pointer justify-start",children:[(0,l.jsx)("input",v({type:"radio",value:"external",className:"radio checked:bg-primary"},m("contentType"))),(0,l.jsx)("span",{className:"ml-3 label-text",children:"External link"})]})}),"text"===P?(0,l.jsx)(h.$_,{className:"mt-4",hint:"Text to be used as the content for the NFT",name:"textContent",label:"Text content",placeholder:"e.g. Step 1: Add ..., Step 2: ???, Step 3: Profit",rows:5,showOptionalLabel:!0,registerOptions:{required:{value:!0,message:"The contents must be provided when using embedded content"}}}):null,"external"===P?(0,l.jsx)(h.ZP,{className:"mt-4 max-w-sm",hint:"Link to the content hosted on an external site",name:"contentUrl",label:"Link to external content",placeholder:"e.g. https://google.com",registerOptions:{required:{value:!0,message:"A link to the original content is required"}}}):null,(0,l.jsx)("div",{className:"divider"}),(0,l.jsx)("h3",{className:"text-lg mb-4",children:"Marketplace"}),(0,l.jsx)("img",{src:T||g.iK,alt:"Preview image for new lendable",className:"m-auto my-8"}),(0,l.jsx)(h.ZP,{hint:"Link to image to be used on the marketplace",name:"marketplaceImageUrl",label:"Marketplace image URL",className:"mt-4 max-w-sm",placeholder:"e.g. https://placekitten.com/g/200/300",showOptionalLabel:!0}),(0,l.jsx)(h.$_,{hint:"Text to be displayed on the marketplace, used by the search",name:"description",label:"Marketplace description",placeholder:"e.g. My family's secret recipe handed down for generations...",className:"mt-4",showOptionalLabel:!0}),(0,l.jsx)("div",{className:"divider"}),(0,l.jsx)("h3",{className:"text-lg mb-4",children:"Monetization"}),(0,l.jsx)("div",{className:"mt-4 form-control",children:(0,l.jsxs)("label",{className:"label cursor-pointer justify-start",children:[(0,l.jsx)("input",v({type:"radio",value:"singlePayment",className:"radio checked:bg-primary"},m("monetizationOption"))),(0,l.jsx)("span",{className:"ml-3 label-text",children:"Single payment"})]})}),(0,l.jsx)("div",{className:"form-control",children:(0,l.jsxs)("label",{className:"label cursor-pointer justify-start",children:[(0,l.jsx)("input",v({type:"radio",value:"royalties",className:"radio checked:bg-primary"},m("monetizationOption"))),(0,l.jsx)("span",{className:"ml-3 label-text",children:"Royalties"})]})}),"singlePayment"===I?(0,l.jsx)(h.ZP,{name:"oneTimeFee",label:"One-time fee",type:"number",min:0,step:"1",placeholder:"e.g. 15",registerOptions:{required:!0},wrapInput:function(e){return(0,l.jsxs)(l.Fragment,{children:[e,(0,l.jsx)("span",{children:(0,l.jsx)("span",{className:"kbd kbd-xs",children:"TINYBAR"})})]})}}):null,"royalties"===I?(0,l.jsx)(h.ZP,{name:"royaltyAmount",label:"Royalties",type:"text",placeholder:"e.g. 3.5",hint:"Can be any number between 0 and 10",registerOptions:{required:!0,validNum:function(e){return Number.isFinite(parseFloat(e))}},wrapInput:function(e){return(0,l.jsxs)(l.Fragment,{children:[e,(0,l.jsx)("span",{children:"%"})]})}}):null,(0,l.jsx)("div",{className:"divider"}),(0,l.jsx)("h3",{className:"text-lg mb-4",children:"Usage"}),(0,l.jsxs)("div",{className:"mt-4 form-control",children:[(0,l.jsx)("label",{htmlFor:"",className:"label",children:(0,l.jsx)("span",{className:"label-text",children:"Pick a template"})}),(0,l.jsxs)("select",v({disabled:k.loading,className:"select w-full max-w-sm"},m("legalTemplateId",{required:!0}),{children:[(0,l.jsx)("option",{value:"",disabled:!0,children:"Pick one"}),(k.data||[]).map((function(e){return(0,l.jsx)("option",{value:e.id,children:e.displayName},e.id)}))]}))]}),E?(0,l.jsxs)("div",{className:"mt-8",children:[(0,l.jsx)("p",{className:"mb-2",children:"Preview:"}),(0,l.jsx)(j.D,{className:"prose bg-white border border-accent p-4 rounded-md",children:E.contents})]}):null]}),(0,l.jsxs)("div",{className:"mt-8 flex flex-row justify-end",children:[(0,l.jsx)(i(),{href:"/dashboard",children:(0,l.jsx)("a",{className:"btn btn-ghost",children:"Back to dashboard"})}),(0,l.jsx)("button",{className:p()("ml-4 btn btn-primary",{loading:O}),children:"Create lendable"})]})]})}))]})};w.applyLayout=c.E,t.default=w}},function(e){e.O(0,[536,655,774,888,179],(function(){return t=1948,e(e.s=t);var t}));var t=e.O();_N_E=t}]);