import { AfterViewInit, Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { InViewDirective } from './in-view.directive';
import { ExtractPublic } from '@infinum/ngx-nuts-and-bolts/testing-utils';

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
