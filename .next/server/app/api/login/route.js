(()=>{var e={};e.id=761,e.ids=[761],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},8626:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>x,routeModule:()=>u,serverHooks:()=>l,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>c});var s={};t.r(s),t.d(s,{POST:()=>p});var n=t(2706),o=t(8203),a=t(5994),i=t(9187);async function p(e){try{let{email:r,password:t}=await e.json(),s=await fetch("https://linkup-back.vercel.app/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:r,password:t})});if(!s.ok)throw Error("Invalid credentials");let n=await s.json();return i.NextResponse.json(n)}catch(e){return console.error("Admin login error:",e),i.NextResponse.json({error:"Invalid credentials"},{status:400})}}let u=new n.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/login/route",pathname:"/api/login",filename:"route",bundlePath:"app/api/login/route"},resolvedPagePath:"C:\\Users\\agrad\\Documents\\GitHub\\Linkup\\app\\api\\login\\route.js",nextConfigOutput:"",userland:s}),{workAsyncStorage:d,workUnitAsyncStorage:c,serverHooks:l}=u;function x(){return(0,a.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:c})}},6487:()=>{},8335:()=>{}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,452],()=>t(8626));module.exports=s})();