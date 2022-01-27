# ExtractPublic

Use <span class="x x-first x-last">`</span>ExtractPublic<span class="x x-first x-last">`</span> custom type when you want to extract public members of class. It could prove most useful when creating test doubles for your services or components[^1].

## 1. Usage

```ts
export class UserTestingService implements ExtractPublic<UserService>{
...
}
```

[^1]: Using this custom type with components could result in redundant code in test doubles since e.g. component could contain public methods used in templates which might be unnecessary in the testing double.
