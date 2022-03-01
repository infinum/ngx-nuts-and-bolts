---
id: observe-resize
title: ObserveResize directive
sidebar_label: ObserveResize directive
---

## 1. Features

`infObserveResize` directive allows you to react to changes in dimensions of its host, using native `ResizeObserver`.

## 2. Usage

Import `ObserveResizeModule` which contains the `infObserveResize` directive.

Simply add `infObserveResize` directive to whatever DOM node you care about. You can then handle notifications from `(infObserveResize)` EventEmitter.

```ts
@Component({
	selector: 'app-example',
	template: `<div (infObserveResize)="resizeObserverEntry$.next($event)>{{ resizeObserverEntry$ | async }}</div>`,
})
class ExampleComponent {
	public resizeObserverEntry$ = new Subject<ResizeObserverEntry>();
}
```

## 3. Testing

If you don't care about actual native `ResizeObserver` behavior in tests, just import the `ObserveResizeTestingModule` and use that in your tests. You will have to fire the events manually as the testing implementation is empty.

Jest's jsdom doesn't support `ResizeObserver` so you don't have much choice there.

On the other hand if you do want to test handling of resize events feel free to use the `ObserveResizeModule`, however be aware of certain gotchas that come with testing `ResizeObserver`.

### Issue

Let's assume we have this component:

```ts
@Component({
	selector: 'app-root',
	template: `
		<div (infObserveResize)="onResize($event)"></div>
		<output *ngIf="height$ | async as height">{{ height }}</output>
	`,
})
class AppComponent implements AfterViewInit, OnDestroy {
	private readonly _height$ = new BehaviorSubject(0);
	public readonly height$ = this._height.asObservable();

	public onResize(entry: ResizeObserverEntry): void {
		this._height$.next(entry.contentRect.height);
	}
}
```

Suppose we attempt to test `infObserveResize` with following case:

```ts
// ❌ incorrect
describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ObserveResizeModule],
			declarations: [AppComponent],
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
	});
	it('should mirror rectangle height into output', async () => {
		const resizableDebugEl = fixture.debugElement.query(By.css('div'));
		const heightOutputDebugEl = fixture.debugElement.query(By.css('output'));
		let newHeight = '250';
		resizableDebugEl.nativeElement.style.height = `${newHeight}px`;
		await fixture.whenStable();
		fixture.detectChanges();
		expect(heightOutputDebugEl.nativeElement.innerText).toBe(newHeight);
		newHeight = '400';
		resizableDebugEl.nativeElement.style.height = `${newHeight}px`;
		await fixture.whenStable();
		fixture.detectChanges();
		expect(heightOutputDebugEl.nativeElement.innerText).toBe(newHeight);
	});
});
```

Unfortunately above won't as well as when we run the tests, we will see it complaining that expected `heightOutputDebugEl` innerText doesn't match `newHeight`. Why is that?

Clearly the browser doesn't fire ResizeObserver notifications the instant one of the elements gets resized or to make it clearer, it doesn't trigger the moment anything which could cause a resize happens. Instead, it runs as described in [spec](https://www.w3.org/TR/resize-observer/#html-event-loop), TL;DR after layout gets updated, but before repaint. Closest the end of that would be using `requestAnimationFrame` with `setTimeout`, where `requestAnimationFrame` runs its callback just before the repaint happens, we can defer it to next macrotask with `setTimeout` (which is bound to happen after repaint). We could use artificial delay as well, but that wouldn't guarantee the execution after the next repaint.

## Test solution

```ts
// ✅ correct
function afterRepaint(): Promise<void> {
	return new Promise((resolve) => {
		requestAnimationFrame(() => setTimeout(() => resolve()));
	});
}
describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ObserveResizeModule],
			declarations: [AppComponent],
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
	});
	it('should mirror rectangle height into output', async () => {
		const resizableDebugEl = fixture.debugElement.query(By.css('div'));
		const heightOutputDebugEl = fixture.debugElement.query(By.css('output'));
		let newHeight = '250';
		resizableDebugEl.nativeElement.style.height = `${newHeight}px`;
		await afterRepaint();
		await fixture.whenStable();
		fixture.detectChanges();
		expect(heightOutputDebugEl.nativeElement.innerText).toBe(newHeight);
		newHeight = '400';
		resizableDebugEl.nativeElement.style.height = `${newHeight}px`;
		await afterRepaint();
		await fixture.whenStable();
		fixture.detectChanges();
		expect(heightOutputDebugEl.nativeElement.innerText).toBe(newHeight);
	});
});
```

By awaiting `afterRepaint` we are guaranteeing that the test case is synchronized properly.
