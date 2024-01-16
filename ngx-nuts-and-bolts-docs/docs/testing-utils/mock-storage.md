---
id: mock-storage
title: Mock storage
sidebar_label: Mock storage
---

When you need to interact with storage but still you are testing only a unit of the code, you can use `MockStorage` class for this purpose. Mocked version doesn't take into account stuff like size limits and other things taken care by `window.localstorage API` and just focuses on core functionality.

## 1. Usage

```ts
let storage: Storage;

beforeEach(async () => {
	await TestBed.configureTestingModule({
		providers: [
			{
				provide: Storage,
				useClass: MockStorage,
			},
		],
	});
	storage = TestBed.inject(Storage);
});
```
