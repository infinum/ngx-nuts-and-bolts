import { Directive } from '@angular/core';
import { ResizeObserverService } from '../services/resize-observer.service';

/**
 * Use of this container is optional. However, if you do use it, all children `OverflowCheckDirective`s will use the same instance of `ResizeObserverService` and the same underlying `ResizeObserver`. This can be beneficial for performance when there are many elements being observed.
 */
@Directive({
	selector: '[infOverflowCheckContainer]',
	standalone: true,
	providers: [ResizeObserverService],
})
export class OverflowCheckContainerDirective {}
