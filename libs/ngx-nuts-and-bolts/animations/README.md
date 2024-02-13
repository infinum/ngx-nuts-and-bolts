# @infinum/ngx-nuts-and-bolts/animations

Secondary entry point of `@infinum/ngx-nuts-and-bolts`. It can be used by importing from `@infinum/ngx-nuts-and-bolts/animations`.

## 1. Features

This library includes two commonly used animations — `fadeAnimation()` and `heightAnimation()`. Both functions are factories that are to be used inside component decorators' `animations` array. Configurable properties are `duration` (in ms) and `triggerName` with the following default values:

| Animation           | Trigger name | Duration [ms] |
| ------------------- | ------------ | ------------- |
| `fadeAnimation()`   | `fade`       | `250`         |
| `heightAnimation()` | `height`     | `250`         |

## 2. Usage

```ts
@NgComponent({
	animations: [heightAnimation(), fadeAnimation()],
})
export class MyComponent {}
```

```html
<button (click)="isOpened = !isOpened">Toggle</button>

<div *ngIf="isOpened" @fade @height>Lorem ipsum...</div>
```

For general information about Angular animations, please consider visiting the official [Angular
animations documentation](https://angular.io/guide/animations)
