(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[467],{3698:function(n,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contracts/[contractId]",function(){return r(5289)}])},9321:function(n,e,r){"use strict";r.d(e,{Di:function(){return a},Ph:function(){return t},iK:function(){return s}});var s="".concat("//legalit","/legalit-logo.jpg"),t="contracts-2",a="lendables-2"},5289:function(n,e,r){"use strict";r.r(e),r.d(e,{ChainDetailpage:function(){return h}});var s=r(5893),t=r(6222),a=r(9321),l=r(1850),i=r(9110),c=r(9008),o=r(1664),d=r.n(o),u=r(1163),h=function(){var n=(0,u.useRouter)(),e=(0,l.aC)().user,r=n.query.contractId,o=(0,i._e)(a.Ph,r),h=(0,i.Lu)(a.Di);if(o.loading)return(0,s.jsx)(t.p,{});var f=o.data,m=f.lendables.map((function(n){var e;return null===(e=h.data)||void 0===e?void 0:e.find((function(e){return e.id===n.ipChainId}))})).filter((function(n){return n}));return(0,s.jsxs)("div",{className:"w-full max-w-3xl m-auto",children:[(0,s.jsx)(c.default,{children:(0,s.jsxs)("title",{children:[f.name," | chain"]})}),(0,s.jsxs)("section",{className:"prose dark:prose-invert",children:[(0,s.jsxs)("span",{className:"text-xs",children:["Check it out on"," ",(0,s.jsxs)("a",{href:"https://hashscan.io/#/testnet/transaction/0.0.34750577-1652729775-189663311",target:"_blank",rel:"nofollow noreferrer",className:"link link-secondary",children:[(0,s.jsx)("span",{className:"material-icons mr-1 text-sm",children:"query_stats"}),"HashScan"]})]}),(0,s.jsx)("h1",{children:f.name}),f.storefrontImageUrl?(0,s.jsx)("img",{src:f.storefrontImageUrl||a.iK,alt:"Image of ".concat(f.name),className:"m-auto my-8"}):null,(0,s.jsx)("a",{href:f.contentUrl,target:"_blank",rel:"noreferrer nofollow",children:f.contentUrl}),f.description?(0,s.jsx)("p",{children:f.description}):null]}),(0,s.jsxs)("section",{className:"mt-8 w-full max-w-3xl p-4 border border-primary rounded-lg",children:[(0,s.jsx)("div",{className:"prose dark:prose-invert",children:(0,s.jsx)("h3",{children:"Lendables used"})}),0===f.lendables.length?(0,s.jsx)("p",{children:"No lendables were used"}):(0,s.jsx)("ul",{className:"p-2",children:m.map((function(n){return(0,s.jsx)("li",{children:(0,s.jsx)(d(),{href:"/lendables/".concat(n.id),children:(0,s.jsx)("a",{className:"link link-primary",children:n.name})})},n.id)}))})]}),(0,s.jsx)("div",{className:"mt-16 flex flex-row justify-end",children:(null===e||void 0===e?void 0:e.uid)===f.userId?(0,s.jsx)(d(),{href:"/contracts/".concat(r,"/export"),children:(0,s.jsx)("a",{className:"btn btn-primary",children:"Get QR code"})}):null})]})};e.default=h},9008:function(n,e,r){n.exports=r(3121)}},function(n){n.O(0,[774,888,179],(function(){return e=3698,n(n.s=e);var e}));var e=n.O();_N_E=e}]);