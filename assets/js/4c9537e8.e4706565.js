"use strict";(self.webpackChunkngx_nuts_and_bolts_docs=self.webpackChunkngx_nuts_and_bolts_docs||[]).push([[734],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return g}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(n),g=o,h=u["".concat(s,".").concat(g)]||u[g]||c[g]||r;return n?a.createElement(h,i(i({ref:t},p),{},{components:n})):a.createElement(h,i({ref:t},p))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var d=2;d<r;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1432:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return p},default:function(){return u}});var a=n(7462),o=n(3366),r=(n(7294),n(3905)),i=["components"],l={id:"component-with-loading-state",title:"Component with loading state",sidebar_label:"Component with loading state"},s="Component with loading state",d={unversionedId:"loading-state/component-with-loading-state",id:"loading-state/component-with-loading-state",title:"Component with loading state",description:"Or how I learned to start worrying and handle the error states.",source:"@site/docs/loading-state/loading-state.md",sourceDirName:"loading-state",slug:"/loading-state/",permalink:"/ngx-nuts-and-bolts/docs/loading-state/",tags:[],version:"current",frontMatter:{id:"component-with-loading-state",title:"Component with loading state",sidebar_label:"Component with loading state"},sidebar:"mainSidebar",previous:{title:"Introduction",permalink:"/ngx-nuts-and-bolts/docs/"}},p=[{value:"1. Features",id:"1-features",children:[],level:2},{value:"2. Configuration",id:"2-configuration",children:[{value:"2.1. Setting delays globally",id:"21-setting-delays-globally",children:[],level:3},{value:"2.2. Setting delays for a particular component",id:"22-setting-delays-for-a-particular-component",children:[],level:3}],level:2},{value:"3. Usage",id:"3-usage",children:[{value:"3.1. Extending <code>ComponentWithLoadingState</code>",id:"31-extending-componentwithloadingstate",children:[],level:3},{value:"3.2. Use with helper functions",id:"32-use-with-helper-functions",children:[],level:3}],level:2}],c={toc:p};function u(e){var t=e.components,n=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"component-with-loading-state"},"Component with loading state"),(0,r.kt)("p",null,"Or how I learned to start worrying and handle the error states."),(0,r.kt)("p",null,"This class should really be called ",(0,r.kt)("inlineCode",{parentName:"p"},"Component with loading and error states")," (CWLARS for short), but it was just too much."),(0,r.kt)("h2",{id:"1-features"},"1. Features"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ComponentWithLoadingState")," class allows you to extend your application components with loading and error states."),(0,r.kt)("p",null,"Different enter and leave delay times allow for showing and hiding the loader only if the loading takes at least a certain amount of time. This provides a better UX where the user will not see a loading state if the loading takes very short time, preventing quick flashes. If for whatever reason you need access to the loading observable without any debounce delays, you can use ",(0,r.kt)("inlineCode",{parentName:"p"},"directLoading$"),"."),(0,r.kt)("p",null,"When loading begins, any previous error is cleared, avoiding the need to handle clearing errors on retry manually. Similarly, when an error is set, the loading state is cleared. Please note that these side-effects will trigger only if you subscribe to both the error and the loading observables."),(0,r.kt)("p",null,"Accompanying loading and error observables is an observable for checking if the initial loading is done. This can be useful to show a different loading state on the initial load."),(0,r.kt)("p",null,"It usually makes sense to allow the user to retry on error. For this purpose, ",(0,r.kt)("inlineCode",{parentName:"p"},"ComponentWithLoadingState")," exposes ",(0,r.kt)("inlineCode",{parentName:"p"},"loadingTrigger$"),' observable that is used to "kick-start" the RxJS pipeline and ',(0,r.kt)("inlineCode",{parentName:"p"},"onRetry")," handler that triggers ",(0,r.kt)("inlineCode",{parentName:"p"},"loadingTrigger$"),"."),(0,r.kt)("h2",{id:"2-configuration"},"2. Configuration"),(0,r.kt)("p",null,"By default, loader enter delay is set to 250ms and loader leave delay is set to 0ms. You can change these values globally for all components that extend ",(0,r.kt)("inlineCode",{parentName:"p"},"ComponentWithLoadingState")," or on a case-by-case basis. If there is no globally defined provider nor a component-level provider for some specific component, the component will use the default delays."),(0,r.kt)("h3",{id:"21-setting-delays-globally"},"2.1. Setting delays globally"),(0,r.kt)("p",null,"Provide the desired values in a provider in your ",(0,r.kt)("inlineCode",{parentName:"p"},"AppModule"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"{\n    provide: COMPONENT_WITH_LOADING_STATE_CONFIG,\n    useValue: {\n        enterDelay: 300,\n        leaveDelay: 100,\n    }\n}\n")),(0,r.kt)("h3",{id:"22-setting-delays-for-a-particular-component"},"2.2. Setting delays for a particular component"),(0,r.kt)("p",null,"Pass the desired values via component-specific provider (this will override any values set in the global provider):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"@Component({\n    ...\n    providers: [{\n        provide: COMPONENT_WITH_LOADING_STATE_CONFIG,\n        useValue: {\n            enterDelay: 300,\n            leaveDelay: 100,\n        }\n    }],\n    ...\n})\nclass MyComponent extends ComponentWithLoadingState {}\n")),(0,r.kt)("h2",{id:"3-usage"},"3. Usage"),(0,r.kt)("p",null,"There are two ways to implement handling the loading and error states:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Extend ",(0,r.kt)("inlineCode",{parentName:"li"},"ComponentWithLoadingState")," base class and use ",(0,r.kt)("inlineCode",{parentName:"li"},"_loading$")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"_error$")," observables to emit values and ",(0,r.kt)("inlineCode",{parentName:"li"},"loading$")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"error$")," observables to react to state changes",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"this requires the least amount of boilerplate and works for components that have only one set of loading and error states"))),(0,r.kt)("li",{parentName:"ol"},"Use ",(0,r.kt)("inlineCode",{parentName:"li"},"privateLoadingState")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"publicLoadingState")," functions to manually create observables",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"this requires a bit more work, but it allows you to have multiple sets of loading and error states within the same component")))),(0,r.kt)("h3",{id:"31-extending-componentwithloadingstate"},"3.1. Extending ",(0,r.kt)("inlineCode",{parentName:"h3"},"ComponentWithLoadingState")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},'<ng-container *ngIf="templateData$ | async as templateData">...</ng-container>\n\n<ng-container *ngIf="loading$ | async">Loading...</ng-container>\n\n<ng-container *ngIf="error$ | async">\n    <button (click)="onRetry()">Retry</button>\n</ng-container>\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"\ninterface ITemplateData { ... }\n\nclass MyComponent extends ComponentWithLoadingState {\n    public readonly templateData$ = this.createTemplateDataObservable();\n\n    private createTemplateDataObservable(): Observable<ITemplateData> {\n        this.loadingTrigger$.pipe( // onRetry() will emit to loadingTrigger$\n            switchMap(() => {\n                this._loading$.next(true);\n\n                return this.fetchData().pipe(\n                    catchError((e) => {\n                        // you could add additional error handling logic, based on the error type\n                        this._error.next(e);\n                        return EMPTY;\n                    }),\n                    finalize(() => {\n                        this._loading$.next(false);\n                    })\n                );\n            }),\n        )\n    }\n\n    private fetchData(): Observable<ITemplateData> {\n        ...\n    }\n}\n")),(0,r.kt)("p",null,"Please note that data, loading and error containers are not nested inside of each other in the template. It is ok to have some additional wrapper elements, but loading container should not be a descendant of the data container (nor vice-versa) because it would introduce dependencies to the order in which the subscriptions are initialized and could cause the loading, error, and/or data to not render in certain cases. Keep the template simple and flat."),(0,r.kt)("p",null,"There is a possible variation when ",(0,r.kt)("inlineCode",{parentName:"p"},"fetchData")," returns a long-living observable (e.g. if it depends on route query params):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"private createTemplateDataObservable(): Observable<ITemplateData> {\n    this.loadingTrigger$.pipe(\n        switchMap(() => {\n            this._loading$.next(true);\n\n            return this.fetchData().pipe(\n                catchError((e) => {\n                    this._error.next(e);\n                    this._loading$.next(false); // necessary because returning EMPTY will not trigger the downstream tap\n                    return EMPTY;\n                }),\n                tap(() => {\n                    // finalize was replaced with tap because a long-living observable fill never complete\n                    this._loading$.next(false);\n                })\n            );\n        }),\n    )\n}\n")),(0,r.kt)("h3",{id:"32-use-with-helper-functions"},"3.2. Use with helper functions"),(0,r.kt)("p",null,"Ideally, the component should only be handling one loading/error state for one data source observable. If the component is handling multiple independent data source observables, it is probably best to consider splitting up the component into multiple components."),(0,r.kt)("p",null,"If you really do need to handle multiple data source observables from the same component, you will not be able to extend ",(0,r.kt)("inlineCode",{parentName:"p"},"ComponentWithLoadingState")," because it can only handle one source observable. In such cases, use ",(0,r.kt)("inlineCode",{parentName:"p"},"publicLoadingState")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"privateLoadingState")," to create multiple sets of loading state observables. Here is a quick example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"class MyComponent {\n    protected readonly loadingTrigger1$ = new BehaviorSubject<void>(undefined);\n    protected readonly _error1$: IPrivateLoadingState<TError>['_error$'];\n    public readonly error1$: IPublicLoadingState<TError>['error$'];\n    protected readonly _loading1$: IPrivateLoadingState<TError>['_loading$'];\n    public readonly loading1$: IPublicLoadingState<TError>['loading$'];\n\n    protected readonly loadingTrigger2$ = new BehaviorSubject<void>(undefined);\n    protected readonly _error2$: IPrivateLoadingState<TError>['_error$'];\n    public readonly error2$: IPublicLoadingState<TError>['error$'];\n    protected readonly _loading2$: IPrivateLoadingState<TError>['_loading$'];\n    public readonly loading2$: IPublicLoadingState<TError>['loading$'];\n\n    constructor() {\n        const _state1 = privateLoadingState();\n        const state1 = publicLoadingState(_state1);\n        this._error1$ = _state1._error$;\n        this.error1$ = state1.error$;\n        this._loading1$ = _state1._loading$;\n        this.loading1$ = state1.loading$;\n\n        const _state2 = privateLoadingState();\n        const state2 = publicLoadingState(_state2);\n        this._error2$ = _state2._error$;\n        this.error2$ = state2.error$;\n        this._loading2$ = _state2._loading$;\n        this.loading2$ = state2.loading$;\n    }\n}\n")),(0,r.kt)("p",null,"You continue to use the two sets of ","_","error$, error$, ","_","loading$ and loading$ just as you would when working with one set when extending ",(0,r.kt)("inlineCode",{parentName:"p"},"ComponentWithLoadingState"),". It is probably clear why you would not want to do this and stick with using only one set of states. Do this only if necessary"))}u.isMDXComponent=!0}}]);