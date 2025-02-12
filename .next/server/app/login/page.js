(()=>{var e={};e.id=520,e.ids=[520],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},860:(e,r,a)=>{"use strict";a.r(r),a.d(r,{GlobalError:()=>i.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>l});var t=a(260),s=a(8203),o=a(5155),i=a.n(o),n=a(7292),d={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);a.d(r,d);let l=["",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,148)),"C:\\Users\\agrad\\Documents\\GitHub\\Linkup\\app\\login\\page.jsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,7060)),"C:\\Users\\agrad\\Documents\\GitHub\\Linkup\\app\\layout.jsx"],"not-found":[()=>Promise.resolve().then(a.bind(a,8255)),"C:\\Users\\agrad\\Documents\\GitHub\\Linkup\\app\\not-found.jsx"],forbidden:[()=>Promise.resolve().then(a.t.bind(a,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(a.t.bind(a,1485,23)),"next/dist/client/components/unauthorized-error"]}],c=["C:\\Users\\agrad\\Documents\\GitHub\\Linkup\\app\\login\\page.jsx"],u={require:a,loadChunk:()=>Promise.resolve()},p=new t.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/login/page",pathname:"/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},9463:(e,r,a)=>{Promise.resolve().then(a.bind(a,148))},2607:(e,r,a)=>{Promise.resolve().then(a.bind(a,3252))},3252:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>v});var t=a(5512),s=a(8009),o=a(9334),i=a(7795),n=a(8747),d=a(771),l=a(1007),c=a(5536),u=a(3861),p=a(8531),m=a.n(p),f=a(716),g=a(1115),x=a(4825);let b=(0,x.A)("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]),h=(0,x.A)("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);function v(){let[e,r]=(0,s.useState)(""),[a,p]=(0,s.useState)(""),[x,v]=(0,s.useState)(!1),[y,w]=(0,s.useState)(!1),{login:j}=(0,i.A)(),N=(0,o.useRouter)(),{language:P}=(0,n.o)(),{toast:k}=(0,f.dj)(),_={en:{title:"Welcome back",description:"Enter your email and password to access your account",emailLabel:"Email",emailPlaceholder:"name@company.com",passwordLabel:"Password",passwordPlaceholder:"••••••••",forgotPassword:"Forgot password?",signIn:"Sign in",signingIn:"Signing in...",loginFailed:"Login failed. Please check your credentials.",loginError:"An error occurred during login. Please try again.",showPassword:"Show password",hidePassword:"Hide password"},es:{title:"Bienvenido de nuevo",description:"Ingresa tu email y contrase\xf1a para acceder a tu cuenta",emailLabel:"Email",emailPlaceholder:"nombre@empresa.com",passwordLabel:"Contrase\xf1a",passwordPlaceholder:"••••••••",forgotPassword:"\xbfOlvidaste tu contrase\xf1a?",signIn:"Iniciar sesi\xf3n",signingIn:"Iniciando sesi\xf3n...",loginFailed:"Error al iniciar sesi\xf3n. Por favor verifica tus credenciales.",loginError:"Ocurri\xf3 un error durante el inicio de sesi\xf3n. Por favor, intenta de nuevo.",showPassword:"Mostrar contrase\xf1a",hidePassword:"Ocultar contrase\xf1a"}}[P],L=async r=>{r.preventDefault(),v(!0),console.log("Login attempt initiated");try{let r=await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:a})}),t=await r.json();if(r.ok){if(console.log("Login successful:",t),t.token)await j(t.token),k({title:"Login Successful",description:"Welcome back!"}),N.push("/dashboard");else throw Error("No token received from server")}else console.error("Login error:",t),k({title:_.loginFailed,description:t.error||"Please check your credentials and try again.",variant:"destructive"})}catch(e){console.error("Login error:",e),k({title:_.loginError,description:e.message||"An unexpected error occurred",variant:"destructive"})}finally{v(!1)}};return(0,t.jsxs)("div",{className:"min-h-screen relative flex items-center justify-center px-4 overflow-hidden",children:[(0,t.jsxs)("div",{className:"absolute inset-0 -z-10",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-br from-secondary-50/50 via-white to-secondary-50/50"})]}),(0,t.jsx)("div",{className:"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10",children:(0,t.jsx)("div",{className:"h-[500px] w-[500px] rounded-full bg-secondary-500/5 blur-[100px]"})}),(0,t.jsx)(g.P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"w-full max-w-md",children:(0,t.jsxs)(u.Zp,{className:"backdrop-blur-sm bg-white/95 border-0 shadow-2xl",children:[(0,t.jsxs)(u.aR,{className:"space-y-1 pb-8",children:[(0,t.jsx)("div",{className:"flex items-center justify-center mb-6",children:(0,t.jsxs)(g.P.div,{initial:{scale:.5,opacity:0},animate:{scale:1,opacity:1},transition:{delay:.2,duration:.5},className:"w-16 h-16 relative",children:[(0,t.jsx)("img",{src:"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LINKUP-removebg-preview-H4uudgwmEMqvfk5xeTIBJIgVNGQTC1.png",alt:"LinkUp Logo",className:"w-full h-full object-contain"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-secondary-500/10 blur-xl rounded-full -z-10"})]})}),(0,t.jsx)(u.ZB,{className:"text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-secondary-800",children:_.title}),(0,t.jsx)(u.BT,{className:"text-center text-gray-600",children:_.description})]}),(0,t.jsx)(u.Wu,{children:(0,t.jsxs)("form",{onSubmit:L,className:"space-y-6",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(c.J,{htmlFor:"email",className:"text-sm font-medium text-gray-700",children:_.emailLabel}),(0,t.jsxs)("div",{className:"relative group",children:[(0,t.jsx)(l.p,{id:"email",type:"email",placeholder:_.emailPlaceholder,value:e,onChange:e=>r(e.target.value),required:!0,className:"h-12 px-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 transition-all duration-300 hover:border-gray-300"}),(0,t.jsx)("div",{className:"absolute inset-0 rounded-xl bg-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"})]})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)(c.J,{htmlFor:"password",className:"text-sm font-medium text-gray-700",children:_.passwordLabel}),(0,t.jsx)(m(),{href:"/forgot-password",className:"text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors",children:_.forgotPassword})]}),(0,t.jsxs)("div",{className:"relative group",children:[(0,t.jsx)(l.p,{id:"password",type:y?"text":"password",placeholder:_.passwordPlaceholder,value:a,onChange:e=>p(e.target.value),required:!0,className:"h-12 px-4 bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 transition-all duration-300 hover:border-gray-300 pr-12"}),(0,t.jsx)(d.$,{type:"button",variant:"ghost",size:"icon",onClick:()=>{w(!y)},className:"absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-secondary-100","aria-label":y?_.hidePassword:_.showPassword,children:y?(0,t.jsx)(b,{className:"h-4 w-4 text-gray-500"}):(0,t.jsx)(h,{className:"h-4 w-4 text-gray-500"})}),(0,t.jsx)("div",{className:"absolute inset-0 rounded-xl bg-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"})]})]}),(0,t.jsx)(d.$,{type:"submit",disabled:x,className:"w-full h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] disabled:opacity-50 disabled:pointer-events-none",children:x?(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"}),(0,t.jsx)("span",{children:_.signingIn})]}):_.signIn})]})})]})})]})}},3861:(e,r,a)=>{"use strict";a.d(r,{BT:()=>d,Wu:()=>l,ZB:()=>n,Zp:()=>o,aR:()=>i});var t=a(5512),s=a(8009);let o=s.forwardRef(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,className:`rounded-lg border bg-card text-card-foreground shadow-sm ${e}`,...r}));o.displayName="Card";let i=s.forwardRef(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,className:`flex flex-col space-y-1.5 p-6 ${e}`,...r}));i.displayName="CardHeader";let n=s.forwardRef(({className:e,...r},a)=>(0,t.jsx)("h3",{ref:a,className:`text-2xl font-semibold leading-none tracking-tight ${e}`,...r}));n.displayName="CardTitle";let d=s.forwardRef(({className:e,...r},a)=>(0,t.jsx)("p",{ref:a,className:`text-sm text-muted-foreground ${e}`,...r}));d.displayName="CardDescription";let l=s.forwardRef(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,className:`p-6 pt-0 ${e}`,...r}));l.displayName="CardContent",s.forwardRef(({className:e,...r},a)=>(0,t.jsx)("div",{ref:a,className:`flex items-center p-6 pt-0 ${e}`,...r})).displayName="CardFooter"},1007:(e,r,a)=>{"use strict";a.d(r,{p:()=>s});var t=a(5512);let s=a(8009).forwardRef(({className:e,type:r,...a},s)=>(0,t.jsx)("input",{type:r,className:`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${e}`,ref:s,...a}));s.displayName="Input"},5536:(e,r,a)=>{"use strict";a.d(r,{J:()=>c});var t=a(5512),s=a(8009),o=a(830),i=s.forwardRef((e,r)=>(0,t.jsx)(o.sG.label,{...e,ref:r,onMouseDown:r=>{r.target.closest("button, input, select, textarea")||(e.onMouseDown?.(r),!r.defaultPrevented&&r.detail>1&&r.preventDefault())}}));i.displayName="Label";var n=a(1643),d=a(124);let l=(0,n.F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=s.forwardRef(({className:e,...r},a)=>(0,t.jsx)(i,{ref:a,className:(0,d.cn)(l(),e),...r}));c.displayName=i.displayName},716:(e,r,a)=>{"use strict";a.d(r,{dj:()=>c});var t=a(5512),s=a(8009),o=a(8952),i=a(1643),n=a(1255),d=a(124);o.Kq,s.forwardRef(({className:e,...r},a)=>(0,t.jsx)(o.LM,{ref:a,className:(0,d.cn)("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",e),...r})).displayName=o.LM.displayName;let l=(0,i.F)("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",{variants:{variant:{default:"border bg-background text-foreground",destructive:"destructive group border-destructive bg-destructive text-destructive-foreground"}},defaultVariants:{variant:"default"}});function c(){return{toast:({title:e,description:r,variant:a})=>{console.log("Toast:",{title:e,description:r,variant:a})}}}s.forwardRef(({className:e,variant:r,...a},s)=>(0,t.jsx)(o.bL,{ref:s,className:(0,d.cn)(l({variant:r}),e),...a})).displayName=o.bL.displayName,s.forwardRef(({className:e,...r},a)=>(0,t.jsx)(o.rc,{ref:a,className:(0,d.cn)("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",e),...r})).displayName=o.rc.displayName,s.forwardRef(({className:e,...r},a)=>(0,t.jsx)(o.bm,{ref:a,className:(0,d.cn)("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",e),"toast-close":"",...r,children:(0,t.jsx)(n.A,{className:"h-4 w-4"})})).displayName=o.bm.displayName,s.forwardRef(({className:e,...r},a)=>(0,t.jsx)(o.hE,{ref:a,className:(0,d.cn)("text-sm font-semibold",e),...r})).displayName=o.hE.displayName,s.forwardRef(({className:e,...r},a)=>(0,t.jsx)(o.VY,{ref:a,className:(0,d.cn)("text-sm opacity-90",e),...r})).displayName=o.VY.displayName},148:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>t});let t=(0,a(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\agrad\\\\Documents\\\\GitHub\\\\Linkup\\\\app\\\\login\\\\page.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\agrad\\Documents\\GitHub\\Linkup\\app\\login\\page.jsx","default")}};var r=require("../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),t=r.X(0,[638,36,952,248],()=>a(860));module.exports=t})();