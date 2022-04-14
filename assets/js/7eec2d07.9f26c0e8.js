"use strict";(self.webpackChunkngx_nuts_and_bolts_docs=self.webpackChunkngx_nuts_and_bolts_docs||[]).push([[414],{3905:function(e,r,t){t.d(r,{Zo:function(){return u},kt:function(){return m}});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=n.createContext({}),l=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},u=function(e){var r=l(e.components);return n.createElement(c.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},p=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=l(t),m=o,f=p["".concat(c,".").concat(m)]||p[m]||d[m]||a;return t?n.createElement(f,s(s({ref:r},u),{},{components:t})):n.createElement(f,s({ref:r},u))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=p;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var l=2;l<a;l++)s[l]=t[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}p.displayName="MDXCreateElement"},3388:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return p}});var n=t(7462),o=t(3366),a=(t(7294),t(3905)),s=["components"],i={id:"async-error",title:"Async error",sidebar_label:"Async error"},c=void 0,l={unversionedId:"testing/async-error",id:"testing/async-error",title:"Async error",description:"If and when returning mocked error from the testing service or in tests, users should avoid doing something like this:",source:"@site/docs/testing/async-error.md",sourceDirName:"testing",slug:"/testing/async-error",permalink:"/ngx-nuts-and-bolts/docs/testing/async-error",tags:[],version:"current",frontMatter:{id:"async-error",title:"Async error",sidebar_label:"Async error"},sidebar:"mainSidebar",previous:{title:"Async data",permalink:"/ngx-nuts-and-bolts/docs/testing/async-data"}},u=[{value:"1. Usage",id:"1-usage",children:[{value:"1.1. Test double scenario",id:"11-test-double-scenario",children:[],level:3},{value:"1.2. Test suite scenario",id:"12-test-suite-scenario",children:[],level:3}],level:2}],d={toc:u};function p(e){var r=e.components,t=(0,o.Z)(e,s);return(0,a.kt)("wrapper",(0,n.Z)({},d,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"If and when returning mocked error from the testing service or in tests, users should avoid doing something like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"public getData(data: TData): Observable<TData>{\n    if(!data){\n        return of(throwError(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 })));\n    }\n    ...\n}\n")),(0,a.kt)("p",null,"or"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"describe('synchronous error throwing', () => {\n    ...\n    it('should return not found error if data does not exist', () => {\n        spyOn(mockService, 'mockMethod').and.returnValue(of(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 })));\n        );\n    });\n});\n\n")),(0,a.kt)("p",null,"The examples above throw observable errors but it ",(0,a.kt)("a",{parentName:"p",href:"https://stackblitz.com/edit/rxjs-hx8yos?devtoolsheight=60"},"returns them synchronously"),". This isn't how services that make API calls behave in real world applications.\nThe purpose of creating test doubles for services or simulating async behavior directly in test suits is to mock the behavior of real world services as closely as possible. This can can be achieved in multiple ways.\nThis specific implementation uses ",(0,a.kt)("inlineCode",{parentName:"p"},"observeOn")," operator with ",(0,a.kt)("inlineCode",{parentName:"p"},"asyncScheduler"),", creating a new macrotask that places the observable in the event loop queue."),(0,a.kt)("h2",{id:"1-usage"},"1. Usage"),(0,a.kt)("p",null,"When returning the mocked error in test suites or test doubles, simply wrap the error data using ",(0,a.kt)("inlineCode",{parentName:"p"},"asyncError")," function and the error will be returned asynchronously."),(0,a.kt)("h3",{id:"11-test-double-scenario"},"1.1. Test double scenario"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"export class MockedDataFetchingService {\n    public getSomeData(data: TData): Observable<TData> {\n        return data\n            ? asyncData(data)\n            : asyncError(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 }));\n    }\n}\n")),(0,a.kt)("h3",{id:"12-test-suite-scenario"},"1.2. Test suite scenario"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"describe('asyncError demo', () => {\n    ...\n    it('should return not found error if data does not exist', () => {\n        spyOn(mockService, 'mockMethod').and.returnValue(\n            asyncError(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 }))\n        );\n    });\n});\n")))}p.isMDXComponent=!0}}]);