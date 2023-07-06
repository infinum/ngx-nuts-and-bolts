"use strict";(self.webpackChunkngx_nuts_and_bolts_docs=self.webpackChunkngx_nuts_and_bolts_docs||[]).push([[613],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return v}});var i=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=i.createContext({}),p=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=p(e.components);return i.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},m=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=p(t),v=a,c=m["".concat(s,".").concat(v)]||m[v]||u[v]||r;return t?i.createElement(c,o(o({ref:n},d),{},{components:t})):i.createElement(c,o({ref:n},d))}));function v(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,o=new Array(r);o[0]=m;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<r;p++)o[p]=t[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4754:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var i=t(7462),a=t(3366),r=(t(7294),t(3905)),o=["components"],l={id:"environment-variables",title:"Environment variables",sidebar_label:"Environment variables"},s=void 0,p={unversionedId:"services/environment-variables",id:"services/environment-variables",title:"Environment variables",description:"Most applications that are deployed to multiple environments have a need for environment variables that can have different values, depending on which environment the app is running in.",source:"@site/docs/services/environment-variables.md",sourceDirName:"services",slug:"/services/environment-variables",permalink:"/ngx-nuts-and-bolts/docs/services/environment-variables",tags:[],version:"current",frontMatter:{id:"environment-variables",title:"Environment variables",sidebar_label:"Environment variables"},sidebar:"mainSidebar",previous:{title:"EnumProperty pipe",permalink:"/ngx-nuts-and-bolts/docs/pipes/enum-property"},next:{title:"Fade and Height animations",permalink:"/ngx-nuts-and-bolts/docs/animations/"}},d=[{value:"1. Features",id:"1-features",children:[],level:2},{value:"1.1. Available variables enum",id:"11-available-variables-enum",children:[],level:2},{value:"1.2. <code>EnvironmentVariablesService</code>",id:"12-environmentvariablesservice",children:[{value:"1.2.1. Methods",id:"121-methods",children:[],level:3},{value:"1.2.2. Configuration",id:"122-configuration",children:[],level:3}],level:2},{value:"1.3 Providers",id:"13-providers",children:[{value:"1.3.1. For SPA Apps - <code>provideEnvironmentVariables</code>",id:"131-for-spa-apps---provideenvironmentvariables",children:[],level:3},{value:"1.3.2. For SSR / Angular Universal Apps - <code>provideUniversalEnvironmentVariables</code>",id:"132-for-ssr--angular-universal-apps---provideuniversalenvironmentvariables",children:[{value:"Providers and their configuration",id:"providers-and-their-configuration",children:[],level:4},{value:"Module configuration",id:"module-configuration",children:[],level:4},{value:"Standalone-components configuration",id:"standalone-components-configuration",children:[],level:4},{value:"Implementation details",id:"implementation-details",children:[],level:4}],level:3},{value:"1.3.3. Custom setup using <code>ENVIRONMENT_VARIABLES_RECORD</code>",id:"133-custom-setup-using-environment_variables_record",children:[],level:3}],level:2},{value:"2. Example applications",id:"2-example-applications",children:[{value:"2.1 Single-page App with fetching",id:"21-single-page-app-with-fetching",children:[],level:3},{value:"2.2 Angular Universal App with SSR",id:"22-angular-universal-app-with-ssr",children:[],level:3}],level:2},{value:"3. Unit testing",id:"3-unit-testing",children:[],level:2},{value:"4. Opinion piece - what about Angular&#39;s <code>environment</code> files?",id:"4-opinion-piece---what-about-angulars-environment-files",children:[],level:2}],u={toc:d};function m(e){var n=e.components,t=(0,a.Z)(e,o);return(0,r.kt)("wrapper",(0,i.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Most applications that are deployed to multiple environments have a need for environment variables that can have different values, depending on which environment the app is running in."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," and the corresponding providers from ",(0,r.kt)("inlineCode",{parentName:"p"},"ngx-nuts-and-bolts")," allow for handling of environment variables in a way that does not require application to be re-built nor to be re-deployed (only restarted in the case of SSR). This allows the same build to be deployed to multiple environments, increasing reliability and providing confidence that the codebase that was tested in pre-production environment is identical to what gets deployed to production. Additionally, this approach works well with Docker - the same Docker image containing the build can be run with different environment values for different environments."),(0,r.kt)("h2",{id:"1-features"},"1. Features"),(0,r.kt)("p",null,"Environment variables feature set consists of two main parts - ",(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," and providers. ",(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," service is what is used in the application when you need to read some specific environment variable value. A provider is what initializes the ",(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," with actual values. Depending on project architecture, you might use the provider that is available in the library, or you might create your own provider that suits your specific needs."),(0,r.kt)("h2",{id:"11-available-variables-enum"},"1.1. Available variables enum"),(0,r.kt)("p",null,"Before starting anything, it is recommended that you define a string enum that will be used for defining all the available environment variables that can be set and read."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"export enum EnvironmentVariable {\n    Foo = 'NGX_NUTS_AND_BOLTS_EXAMPLE_FOO',\n    Bar = 'NGX_NUTS_AND_BOLTS_EXAMPLE_BAR',\n}\n")),(0,r.kt)("p",null,"This enum will be used in place of some generic values for things like ",(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ENVIRONMENT_VARIABLES_RECORD")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesRecord")),(0,r.kt)("h2",{id:"12-environmentvariablesservice"},"1.2. ",(0,r.kt)("inlineCode",{parentName:"h2"},"EnvironmentVariablesService")),(0,r.kt)("h3",{id:"121-methods"},"1.2.1. Methods"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," exposes methods like ",(0,r.kt)("inlineCode",{parentName:"p"},"get"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"getAsNumber")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"getAsBoolean")," that allow you to read environment variable values directly, or try to convert them to a number or a boolean before returning the value. Please read JSDoc comments for more information about each of the methods."),(0,r.kt)("h3",{id:"122-configuration"},"1.2.2. Configuration"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," can be configured by setting a value under ",(0,r.kt)("inlineCode",{parentName:"p"},"ENVIRONMENT_VARIABLES_CONFIG")," DI token to an object that satisfies ",(0,r.kt)("inlineCode",{parentName:"p"},"IEnvironmentVariablesConfig")," interface. You can use ",(0,r.kt)("inlineCode",{parentName:"p"},"provideEnvironmentVariablesServiceConfig")," functional provider. The configuration object has the following properties:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"truthyBooleanStrings")," - An array of strings that will, when reading environment variable via ",(0,r.kt)("inlineCode",{parentName:"li"},"getAsBoolean"),", be consider ",(0,r.kt)("inlineCode",{parentName:"li"},"true"),". Before comparison, the actual value is converted to lowercase. The default value is ",(0,r.kt)("inlineCode",{parentName:"li"},"['true', '1']"),".")),(0,r.kt)("p",null,"This configuration is applied no matter how the environment variables values are provided (SPA or SSR)."),(0,r.kt)("h2",{id:"13-providers"},"1.3 Providers"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," depends on variables and their values to be provided via ",(0,r.kt)("inlineCode",{parentName:"p"},"DI"),". There are two providers that are available in the library (one for SPA and one for SSR) that should cover most use cases, and a way to create your own provider."),(0,r.kt)("h3",{id:"131-for-spa-apps---provideenvironmentvariables"},"1.3.1. For SPA Apps - ",(0,r.kt)("inlineCode",{parentName:"h3"},"provideEnvironmentVariables")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"provideEnvironmentVariables")," is a simple function that receives an object and returns a provider. The passed object must have all the environment variables that are used in the application."),(0,r.kt)("p",null,"Intended use case for this is to fetch environment variables from a file that is bundled with the application. This is the most common use case for SPA apps and is the one that is used in the example application."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="apps/environment-variables-fetch-example/src/main.ts"',title:'"apps/environment-variables-fetch-example/src/main.ts"'},"fetch('./assets/env.json')\n    .then((response) => response.json())\n    .then((env) => {\n        platformBrowserDynamic([provideEnvironmentVariables(env)])\n            .bootstrapModule(AppModule)\n            .catch((err) => console.error(err));\n    });\n")),(0,r.kt)("p",null,"In ",(0,r.kt)("inlineCode",{parentName:"p"},"env.json"),", you would have something like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="apps/environment-variables-fetch-example/src/assets/env.json"',title:'"apps/environment-variables-fetch-example/src/assets/env.json"'},'{\n    "API_URL": "https://api.example.com"\n}\n')),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"env.json")," file should be committed and the committed values in the file should be the values you use during development."),(0,r.kt)("p",null,"When you deploy the app to some environment, you build the application artifacts only once and the DevOps team should implement value replacements of properties in ",(0,r.kt)("inlineCode",{parentName:"p"},"dist/assets/env.json")," file. This replacement must happen after the build, but before the application is deployed (basically copied to production server as static files). This way, user's browser will fetch ",(0,r.kt)("inlineCode",{parentName:"p"},"env.json")," when the app starts and use the values that are set in the file. Values can, of course, be set per-environment (that is the whole point of this feature)."),(0,r.kt)("h3",{id:"132-for-ssr--angular-universal-apps---provideuniversalenvironmentvariables"},"1.3.2. For SSR / Angular Universal Apps - ",(0,r.kt)("inlineCode",{parentName:"h3"},"provideUniversalEnvironmentVariables")),(0,r.kt)("p",null,"The setup for Angular Universal is similar, but there is no env.json file that is fetched. This files was necessary for SPA apps because there is no application runtime, only statically built and served files. However, with SSR, there is a runtime and we can access ",(0,r.kt)("inlineCode",{parentName:"p"},"process.env")," to read values from system-level environment variables."),(0,r.kt)("h4",{id:"providers-and-their-configuration"},"Providers and their configuration"),(0,r.kt)("p",null,"There are two providers that enable use of environment variables on both the server and the client:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"provideUniversalEnvironmentVariables")," - ensures that variables can be read on both server and the client",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"a configuration object allows you to specify which variables are public and which are private. Public variables will be transferred from server to client, while private ones will be kept only on the server"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("inlineCode",{parentName:"li"},"provideProcess")," - provides the global ",(0,r.kt)("inlineCode",{parentName:"li"},"process")," object for use on the server")),(0,r.kt)("h4",{id:"module-configuration"},"Module configuration"),(0,r.kt)("p",null,"Add ",(0,r.kt)("inlineCode",{parentName:"p"},"provideUniversalEnvironmentVariables")," to the ",(0,r.kt)("inlineCode",{parentName:"p"},"AppModule")," (not ",(0,r.kt)("inlineCode",{parentName:"p"},"AppServerModule"),"!):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { provideUniversalEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts-ssr';\n// ...\n\n@NgModule({\n    // ...\n    providers: [\n        // ...\n        provideUniversalEnvironmentVariables({\n            publicVariables: [EnvironmentVariable.Foo],\n            privateVariables: [EnvironmentVariable.Bar],\n        }),\n    ],\n})\nexport class AppModule {}\n")),(0,r.kt)("p",null,"Update ",(0,r.kt)("inlineCode",{parentName:"p"},"AppServerModule")," by adding ",(0,r.kt)("inlineCode",{parentName:"p"},"provideProcess")," provider:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { provideProcess } from '@infinum/ngx-nuts-and-bolts-ssr';\n// ...\n\n@NgModule({\n    // ...\n    providers: [\n        // ...\n        provideProcess(),\n    ],\n})\nexport class AppServerModule {}\n")),(0,r.kt)("h4",{id:"standalone-components-configuration"},"Standalone-components configuration"),(0,r.kt)("p",null,"If you do not use modules and use a standalone component for bootstrapping the app, you must update your application config like so:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { ApplicationConfig } from '@angular/core';\nimport { provideUniversalEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts-ssr';\n// ...\n\nexport const appConfig: ApplicationConfig = {\n    providers: [\n        // ...\n        provideUniversalEnvironmentVariables({\n            publicVariables: [EnvironmentVariable.Foo],\n            privateVariables: [EnvironmentVariable.Bar], // Value for `Bar` will be `undefined` in the browser, but preset on the server.\n        }),\n    ],\n};\n")),(0,r.kt)("p",null,"Next, update server application config:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';\nimport { provideServerRendering } from '@angular/platform-server';\nimport { provideProcess } from '@infinum/ngx-nuts-and-bolts-ssr';\nimport { appConfig } from './app.config';\n\nconst serverConfig: ApplicationConfig = {\n    providers: [provideServerRendering(), provideProcess()],\n};\n\nexport const config = mergeApplicationConfig(appConfig, serverConfig);\n")),(0,r.kt)("p",null,"Please notice that the config used for bootstrapping the application on the server merges the base config with browser-specific config. To draw a comparison with the module-based approach, base config is basically what was in ",(0,r.kt)("inlineCode",{parentName:"p"},"AppModule")," and server config is what was in ",(0,r.kt)("inlineCode",{parentName:"p"},"AppServerModule"),"."),(0,r.kt)("h4",{id:"implementation-details"},"Implementation details"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Implementation detail")," - ",(0,r.kt)("a",{parentName:"p",href:"https://angular.io/api/platform-browser/TransferState"},(0,r.kt)("inlineCode",{parentName:"a"},"TransferState"))," is used to transfer public variables from Node to browser, while private ones are kept only on server and are not transferred to the client."),(0,r.kt)("p",null,"Because the node part of the app will read values from ",(0,r.kt)("inlineCode",{parentName:"p"},"process.env"),", you must provide the global ",(0,r.kt)("inlineCode",{parentName:"p"},"process")," object under ",(0,r.kt)("inlineCode",{parentName:"p"},"PROCESS")," DI token. You can do so by using ",(0,r.kt)("inlineCode",{parentName:"p"},"provideProcess")," functional provider. This is done so that ",(0,r.kt)("inlineCode",{parentName:"p"},"process.env")," is not hard-coded in ",(0,r.kt)("inlineCode",{parentName:"p"},"provideUniversalEnvironmentVariables")," provider, making unit testing easier."),(0,r.kt)("p",null,"When running the app on production server, simply set environment variables in one of the standard ways:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"API_URL=",(0,r.kt)("a",{parentName:"li",href:"https://api.example.com"},"https://api.example.com")," node server.js"),(0,r.kt)("li",{parentName:"ol"},"export API_URL=",(0,r.kt)("a",{parentName:"li",href:"https://api.example.com"},"https://api.example.com")," && node server.js"),(0,r.kt)("li",{parentName:"ol"},"save API_URL=",(0,r.kt)("a",{parentName:"li",href:"https://api.example.com"},"https://api.example.com")," in .env file and source it in server.ts (e.g. using ",(0,r.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/dotenv"},(0,r.kt)("inlineCode",{parentName:"a"},"dotenv"))," NPM package for Node.js)")),(0,r.kt)("p",null,"For development, you can easily define values for variables in a local .env file and source it however you like (e.g. using ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/dotenv"},(0,r.kt)("inlineCode",{parentName:"a"},"dotenv")," ohmyzsh plugin")," or rely on ",(0,r.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/dotenv"},(0,r.kt)("inlineCode",{parentName:"a"},"dotenv"))," implementation in ",(0,r.kt)("inlineCode",{parentName:"p"},"server.ts"),");"),(0,r.kt)("h3",{id:"133-custom-setup-using-environment_variables_record"},"1.3.3. Custom setup using ",(0,r.kt)("inlineCode",{parentName:"h3"},"ENVIRONMENT_VARIABLES_RECORD")),(0,r.kt)("p",null,"This method gives you flexibility to implement a custom way of initializing environment variables record. You can provide the record containing values for environment variables yourself, by manually setting value for ",(0,r.kt)("inlineCode",{parentName:"p"},"ENVIRONMENT_VARIABLES_RECORD")," DI token. This is what both ",(0,r.kt)("inlineCode",{parentName:"p"},"provideEnvironmentVariables")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"provideUniversalEnvironmentVariables")," do internally."),(0,r.kt)("p",null,"The of the object that you provide under ",(0,r.kt)("inlineCode",{parentName:"p"},"ENVIRONMENT_VARIABLES_RECORD")," has to satisfy ",(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesRecord")," generic type. This type receives a generic that is the enum of your available variables."),(0,r.kt)("p",null,"If you do this, do not use ",(0,r.kt)("inlineCode",{parentName:"p"},"provideEnvironmentVariables")," nor ",(0,r.kt)("inlineCode",{parentName:"p"},"provideUniversalEnvironmentVariables")," providers."),(0,r.kt)("h2",{id:"2-example-applications"},"2. Example applications"),(0,r.kt)("p",null,"Please check out the source code repository for two example applications. Example applications use standalone components for bootstrapping the app, but the same principles apply to module-based apps."),(0,r.kt)("h3",{id:"21-single-page-app-with-fetching"},"2.1 Single-page App with fetching"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/infinum/ngx-nuts-and-bolts/tree/main/apps/environment-variables-fetch-example"},(0,r.kt)("inlineCode",{parentName:"a"},"apps/environment-variables-fetch-example"))," demonstrates an example that uses ",(0,r.kt)("inlineCode",{parentName:"p"},"provideEnvironmentVariables")," provider. In ",(0,r.kt)("inlineCode",{parentName:"p"},"main.ts")," (before the application is loaded), ",(0,r.kt)("inlineCode",{parentName:"p"},"./assets/env.json")," is fetched using ",(0,r.kt)("inlineCode",{parentName:"p"},"fetch")," and the application is bootstrapped with the ",(0,r.kt)("inlineCode",{parentName:"p"},"provideEnvironmentVariables")," provider. You can start this example with ",(0,r.kt)("inlineCode",{parentName:"p"},"npm run start:environment-variables-fetch-example"),"."),(0,r.kt)("h3",{id:"22-angular-universal-app-with-ssr"},"2.2 Angular Universal App with SSR"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/infinum/ngx-nuts-and-bolts/tree/main/apps/environment-variables-ssr-example"},(0,r.kt)("inlineCode",{parentName:"a"},"apps/environment-variables-ssr-example"))," uses ",(0,r.kt)("inlineCode",{parentName:"p"},"provideUniversalEnvironmentVariables")," provider. The application has to be started with environment variables exposed to the node process that is running the SSR app. You can start this example with ",(0,r.kt)("inlineCode",{parentName:"p"},"npm run start:environment-variables-ssr-example"),"."),(0,r.kt)("p",null,"For this example, ",(0,r.kt)("inlineCode",{parentName:"p"},"Foo")," variable is set as public, and ",(0,r.kt)("inlineCode",{parentName:"p"},"Bar")," is set as private. That is why you don't see value for ",(0,r.kt)("inlineCode",{parentName:"p"},"Bar")," in the browser, but you will see it in the console of the node process."),(0,r.kt)("h2",{id:"3-unit-testing"},"3. Unit testing"),(0,r.kt)("p",null,"For unit testing, simply call ",(0,r.kt)("inlineCode",{parentName:"p"},"provideEnvironmentVariables")," with desired values for that specific test suite and ",(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," will use those values. You do not have to provide ",(0,r.kt)("inlineCode",{parentName:"p"},"EnvironmentVariablesService")," explicitly, as it has ",(0,r.kt)("inlineCode",{parentName:"p"},"providedIn: 'root'"),". ",(0,r.kt)("inlineCode",{parentName:"p"},"TestBed")," configuration example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"TestBed.configureTestingModule({\n    providers: [\n        provideEnvironmentVariables({\n            [EnvironmentVariable.Foo]: 'I am Foo (testing)',\n            [EnvironmentVariable.Bar]: 'I am Bar (testing)',\n        }),\n    ],\n});\n\nenvService = TestBed.inject(EnvironmentVariablesService);\n")),(0,r.kt)("h2",{id:"4-opinion-piece---what-about-angulars-environment-files"},"4. Opinion piece - what about Angular's ",(0,r.kt)("inlineCode",{parentName:"h2"},"environment")," files?"),(0,r.kt)("p",null,"While Angular provides environment files out-of-the-box (one for development and one for production), but they are not the best solution to this problem for multiple reasons:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Any changes to these files require application re-build and re-deployment"),(0,r.kt)("li",{parentName:"ul"},"Adding a new requirement requires code changes"),(0,r.kt)("li",{parentName:"ul"},"One build per environment",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"At best, this is sub-optimal"),(0,r.kt)("li",{parentName:"ul"},"At worst, it can lead to situations where you think that the builds for different environments were made from the same commit, but something might have been pushed in the meantime and the builds will be different"))),(0,r.kt)("li",{parentName:"ul"},"One file is required for each environment"),(0,r.kt)("li",{parentName:"ul"},"A configuration entry has to be added to ",(0,r.kt)("inlineCode",{parentName:"li"},"angular.json")," for each file"),(0,r.kt)("li",{parentName:"ul"},"Conceptually, the frontend repository should not care about any URLs or other values that are related to the deployment process - they should be stored in the deployment pipeline",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"The only thing that is OK to keep in the frontend repository are URLs for development proxies"))),(0,r.kt)("li",{parentName:"ul"},"Some projects have a CI/CD setup such that each branch gets deployed to some unique environment so that the application is available online as part of pull request and design review processes. This is basically impossible to do with environment files without some hacky file copying and/or search-and-replace of some placeholder values")),(0,r.kt)("p",null,"Although these out-of-the-box files are named ",(0,r.kt)("inlineCode",{parentName:"p"},"environment.ts")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"environment.prod.ts"),", Angular CLI has refers to these files in the ",(0,r.kt)("inlineCode",{parentName:"p"},"configurations")," segment of ",(0,r.kt)("inlineCode",{parentName:"p"},"angular.json"),". Basically, there is a 1-to-1 mapping between build configurations in ",(0,r.kt)("inlineCode",{parentName:"p"},"angular.json")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"environment.ts")," files. ",(0,r.kt)("inlineCode",{parentName:"p"},"configurations")," would probably be a more suitable name because these files are not the best fit for defining environment-specific values likeAPI URL, for all the reasons mentioned before. The main purpose for these files should be to define differences in build configurations - think of them as pragmas. Out-of-the-box they are used to determine whether Angular should run in production or development mode. Similar to the out-of-the-box ",(0,r.kt)("inlineCode",{parentName:"p"},"production")," boolean property, you might have some custom properties that are used, for example, to determine if something should be logged or not in different build configurations."),(0,r.kt)("p",null,"Even though one of the configurations is called ",(0,r.kt)("inlineCode",{parentName:"p"},"production")," and the other ",(0,r.kt)("inlineCode",{parentName:"p"},"development"),", these are usually the only two configurations you actually need. In environments where it is important to provide a optimized build to the end-user, use ",(0,r.kt)("inlineCode",{parentName:"p"},"production")," configuration. In environments where it is important that you can easily debug the deployed code, use ",(0,r.kt)("inlineCode",{parentName:"p"},"development")," configuration. Even if you have many different environments, you are probably still ok with using one of these two configurations in each of the environments (e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"production")," configuration for production and pre-production environments and ",(0,r.kt)("inlineCode",{parentName:"p"},"development")," for development environments). You might want to add one additional middle-ground configuration that has all the optimizations enabled, but also includes sourcemaps that can be used to help with debugging. Basically ",(0,r.kt)("inlineCode",{parentName:"p"},"production")," configuration + sourcemaps on top."),(0,r.kt)("p",null,"We can only hope that one day Angular CLI completely drops ",(0,r.kt)("inlineCode",{parentName:"p"},"environment")," from naming and starts calling these files ",(0,r.kt)("inlineCode",{parentName:"p"},"configuration")," files (e.g. ",(0,r.kt)("inlineCode",{parentName:"p"},"configuration.dev.ts"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"configuration.prod.ts"),"). This would better convey use cases where these files are a good fit. Environment variables should be kept out of these files in most applications. If you think these files will work for your use case, feel free to use them. However, we believe that they are not a good fit for anything other than some really small-scale and/or demo projects."),(0,r.kt)("p",null,"As a final nail in the coffin for developers defaulting to using ",(0,r.kt)("inlineCode",{parentName:"p"},"environment")," files for things like API_URL, ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/angular/angular-cli/commit/283b564d1de985f0af8c2fcb6192801a90baacda"},"Angular CLI removed generation of these files for new projects in version 15"),". You can still enable them after the project is generated, but it is no longer there by default and the usage of these files is discouraged for anything other than defining differences in build configurations (e.g. build with MSW handlers or without)."))}m.isMDXComponent=!0}}]);