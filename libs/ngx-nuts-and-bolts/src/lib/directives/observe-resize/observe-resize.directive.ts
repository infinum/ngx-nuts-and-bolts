import { AfterViewInit, Directive, ElementRef, EventEmitter, NgZone, OnDestroy, Output } from '@angular/core';

@Directive({
	selector: '[infObserveResize]',
})
export class ObserveResizeDirective implements OnDestroy, AfterViewInit {
	@Output('infObserveResize')
	public readonly event = new EventEmitter<ResizeObserverEntry>();

	private observer?: ResizeObserver;

	constructor(private readonly elementRef: ElementRef, private readonly ngZone: NgZone) {}

	public ngAfterViewInit(): void {
		this.observer = new ResizeObserver((entries) => this.ngZone.run(() => this.event.emit(entries[0])));
		this.observer?.observe(this.elementRef.nativeElement);
	}

	public ngOnDestroy(): void {
		this.observer?.disconnect();
	}
}
