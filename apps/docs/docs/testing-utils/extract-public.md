---
id: extract-public
title: Extract public
sidebar_label: Extract public
---

Use `ExtractPublic` custom type when you want to extract public members of class. It could prove most useful when creating test doubles for your services or components[^1].
You might be wondering why you couldn't simply do

```ts
class UserTestingService implements UserService
```

Good question! Perhaps unexpectedly, that would require you to implement private and protected members of UserService as well as public members. You can find a more detailed explanation [here](https://github.com/Microsoft/TypeScript/issues/18499).

## 1. Usage

```ts
import { ExtractPublic } from '@infinum/ngx-nuts-and-bolts/testing-utils';

export class UserTestingService implements ExtractPublic<UserService>{
...
}
```

[^1]: Using this custom type with components could result in redundant code in test doubles since e.g. component could contain public methods used in templates which might be unnecessary in the testing double.
