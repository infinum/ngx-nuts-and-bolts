---
id: in-view
title: InView directive
sidebar_label: InView directive
---

# InView directive

Often times, one may be interested to know whether or not piece a of DOM is visible on the user's screen. We utilize [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) just for that purpose and this directive is a very simple option-less wrapper around it.

## 1. Features

`infInView` directive allows you to determine if a piece of DOM is visible on user's screen.

## 2. Usage

Simply add `infInView` directive to whatever DOM node you care about. You can then handle notifications from `(inView)` EventEmitter.

```ts
@Component({
	selector: 'app-example',
	template: `<div (infInView)="inView$.next($event)>{{ inView$ | async }}</div>`,
})
class ExampleComponent {
	public inView$ = new Subject<boolean>();
}
```

You can also select the directive with a `@ViewChild` as you would any other and read `isInView` property which reflects current status.

```ts
@Component({
	selector: 'app-example',
	template: `<div infInView>{{ inViewDirectiveRef.isInView }}</div>`,
})
class ExampleComponent {
	@ViewChild(InViewDirective)
	public inViewDirectiveRef!: InViewDirective;
}
```

Additionally, you can also export the directive instance in a template directly.

```ts
@Component({
	selector: 'app-example',
	template: `<div infInView #infInViewRef="infInView">{{ infInViewRef.isInView }}</div>`,
})
class ExampleComponent {}
```
