import { AfterViewInit, Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { noop } from 'rxjs';
import { ExtractPublic } from '../../testing/extract-public/extract-public.type';
import { ObserveResizeDirective } from './observe-resize.directive';

@Directive({
	selector: '[infObserveResize]',
})
export class ObserveResizeTestingDirective implements ExtractPublic<ObserveResizeDirective>, OnDestroy, AfterViewInit {
	@Output('infObserveResize')
	public readonly event = new EventEmitter<ResizeObserverEntry>();

	public ngAfterViewInit = noop;
	public ngOnDestroy = noop;
}
