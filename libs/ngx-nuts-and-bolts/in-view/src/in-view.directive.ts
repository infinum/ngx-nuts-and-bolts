import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';

@Directive({ selector: '[infInView]', standalone: true, exportAs: 'infInView' })
export class InViewDirective implements AfterViewInit, OnDestroy {
	@Output('infInView')
	public inView: EventEmitter<boolean> = new EventEmitter<boolean>();

	public isInView: boolean | undefined = undefined;

	private readonly observer = this.initObserver();

	constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

	public ngAfterViewInit(): void {
		this.observer.observe(this.elementRef.nativeElement);
	}

	public ngOnDestroy(): void {
		this.observer.disconnect();
	}

	private initObserver(): IntersectionObserver {
		return new IntersectionObserver(([entry]) => {
			this.isInView = entry.isIntersecting;
			this.inView.emit(entry.isIntersecting);
		});
	}
}
