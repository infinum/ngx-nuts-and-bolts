"use strict";(self.webpackChunkngx_nuts_and_bolts_docs=self.webpackChunkngx_nuts_and_bolts_docs||[]).push([[26],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return g}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),g=r,f=d["".concat(s,".").concat(g)]||d[g]||u[g]||o;return n?a.createElement(f,i(i({ref:t},p),{},{components:n})):a.createElement(f,i({ref:t},p))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9898:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),i=["components"],l={id:"table-state",title:"Table state helpers",sidebar_label:"Table state helpers"},s=void 0,c={unversionedId:"table-state",id:"table-state",title:"Table state helpers",description:"1. Introduction",source:"@site/docs/table-state.md",sourceDirName:".",slug:"/table-state",permalink:"/ngx-nuts-and-bolts/docs/table-state",tags:[],version:"current",frontMatter:{id:"table-state",title:"Table state helpers",sidebar_label:"Table state helpers"},sidebar:"mainSidebar",previous:{title:"Route config loading",permalink:"/ngx-nuts-and-bolts/docs/route-config-loading"},next:{title:"InView directive",permalink:"/ngx-nuts-and-bolts/docs/in-view"}},p=[{value:"1. Introduction",id:"1-introduction",children:[],level:2},{value:"2. Features",id:"2-features",children:[],level:2},{value:"3. Usage",id:"3-usage",children:[],level:2}],u={toc:p};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"1-introduction"},"1. Introduction"),(0,o.kt)("p",null,"Being able to take out the pagination, sorting and filtering information from the memory of the application alleviates some of the problems (link sharing, refreshing pages) which are present when saving that data in-memory. For this purpose, this library exposes functions which cover common use cases regarding table state manipulation."),(0,o.kt)("h2",{id:"2-features"},"2. Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Creation of pagination/sorting/filtering observables which enable consumers to react to pagination/sorting/filtering query parameter change events."),(0,o.kt)("li",{parentName:"ul"},"Saving table state information (pagination/sorting/filtering) into the query parameters.")),(0,o.kt)("h2",{id:"3-usage"},"3. Usage"),(0,o.kt)("p",null,"Helper functions can be used individually or, as the example below shows, with other helper functions and a little bit of RxJS magic which reacts and re-fethces data based on changes in any one of the passed observables."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"\nimport {isEqual} from 'loadsh';\n\ninterface ITemplateData{\n    data: Data;\n    tableState: ITableState;\n}\n\ninterface ITableState{\n    pagination: IPageInfo;\n    sort: ISortInfo;\n    filters: TFilterValue;\n}\n\nexport class MyComponent extends LoadingStateComponent {\n    public readonly templateData$ = this.createTemplateDataObservable();\n\n    constructor(\n        private readonly dataService: DataService,\n        private readonly route: ActivatedRoute,\n        private readonly router: Router\n    ) {}\n\n    private createTemplateDataObservable(): Observable<ITemplateData> {\n        const pagination$ = createPaginationObservable();\n        const sort$ = createSortObservable();\n        const filters$ = createFilteringObservable();\n\n        const tableSate$ = combineLatest([pagination$, sort$, filters$]).pipe(\n            debounceTime(500), // optional, might depend on the use case whether you want this or not\n            distinctUntilChanged(isEqual) // recommended to prevent multiple emits for same navigation events\n        );\n\n        return combineLatest([tableState$, this.loadingTrigger$]).pipe(\n            tap(() =>\xa0{\n                this._loading$.next(true);\n            }),\n            switchMap(([tableState]) =>\xa0{\n                return this.dataService.fetchPaginatedSortedFilteredData(tableState).pipe(\n                    map((data) =>\xa0{\n                        return {\n                            data,\n                            tableState\n                        }\n                    })\n                );\n            })\n            ...\n            finalize(() =>\xa0{\n                this._loading$.next(false);\n            })\n        );\n    }\n}\n")),(0,o.kt)("p",null,"Setting of the query parameters is even simpler as shown in code snippets below. With little mapping, interfaces for pagination and sorting should be usable with most of the 3rd party out-of-the-box data table events. While ",(0,o.kt)("inlineCode",{parentName:"p"},"changeFilters()")," function accepts generic object as filter value."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"...\npublic onPageChange(event: PageEvent): void{\n    const pageInfo: IPageInfo{\n        pageIndex: event.pageIndex,\n        pageSize: event.pageSize\n    }\n\n    changePage(this.router, pageInfo)\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"...\npublic onSortChange(event: SortEvent): void{\n    const sortInfo: ISortInfo{\n        sortDirection: event.direction,\n        sortKey: event.key\n    }\n\n    changeSort(this.router, sortInfo)\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"...\npublic onFiltersChange(event: FilterEvent): void{\n    changeFilters(this.router, event)\n}\n")))}d.isMDXComponent=!0}}]);