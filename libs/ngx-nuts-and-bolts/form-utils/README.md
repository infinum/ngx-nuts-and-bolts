# @infinum/ngx-nuts-and-bolts/form-utils

Secondary entry point of `@infinum/ngx-nuts-and-bolts`. It can be used by importing from `@infinum/ngx-nuts-and-bolts/form-utils`.

## 1. Features

Currently, the types for a form value or raw form value are not publicly exposed. The helper types `FormValue` and `RawFormValue` enable you to retrieve a value or a raw value typings from an Angular form.

## 2. Usage

To leverage these type helpers, you must first create a helper function that returns an Angular `FormGroup`, `FormControl`, etc.

```ts
export function createExampleForm() {
	return new FormGroup({
		exampleControlOne: new FormControl('', { nonNullable: true }),
		exampleControlTwo: new FormControl(''),
	});
}
```

Now, pass the function's return type using the TypeScript `ReturnType` utility type to the form type helper as a generic argument and create new form value and raw form value types as needed for this specific form.

```ts
export type ExampleFormValue = FormValue<ReturnType<typeof createExampleForm>>;
export type ExampleRawFormValue = RawFormValue<ReturnType<typeof createExampleForm>>;
```
