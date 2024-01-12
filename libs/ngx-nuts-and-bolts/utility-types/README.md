# @infinum/ngx-nuts-and-bolts/utility-types

Secondary entry point of `@infinum/ngx-nuts-and-bolts`. It can be used by importing from `@infinum/ngx-nuts-and-bolts/utility-types`.

# `DITokenType`

Use `DITokenType` in cases when you want to infer types of injection tokens in environments where typescript doesn't infer this automatically. E.g. when defining providers (most useful for useFactory providers)

```typescript
type SomeType = {
	name: string;
	description: string;
};

const SOME_TOKEN = new InjectionToken<SomeType>('SOME_TOKEN');

const someProvider: Provider = {
	useFactory: (someTokenValue: DITokenType<typeof SOME_TOKEN>) => {
		//                          ^
		//                          |
		// will resolve to SomeType, so you do not have to c/p it and it will be less prone to errors if type of value provided under SOME_TOKEN changes
	},
};
deps: [SOME_TOKEN];
```
