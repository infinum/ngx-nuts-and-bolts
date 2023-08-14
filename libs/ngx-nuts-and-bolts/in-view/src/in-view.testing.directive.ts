import { AfterViewInit, Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { InViewDirective } from './in-view.directive';

// TODO: @JosipJanus needs to merge https://github.com/infinum/ngx-nuts-and-bolts/pull/10 first
// eslint-disable-next-line @typescript-eslint/ban-types
type ExtractPublic<T extends object> = {
	[K in keyof T]: T[K];
};

@Directive({ selector: '[infInView]', standalone: true, exportAs: 'infInView' })
export class InViewTestingDirective implements ExtractPublic<InViewDirective>, AfterViewInit, OnDestroy {
	@Output('infInView')
	public inView: EventEmitter<boolean> = new EventEmitter<boolean>();

	public isInView: boolean | undefined;

	public ngAfterViewInit(): void {
		this.inView.emit(true);
	}

	public ngOnDestroy = (): void => undefined;
}
