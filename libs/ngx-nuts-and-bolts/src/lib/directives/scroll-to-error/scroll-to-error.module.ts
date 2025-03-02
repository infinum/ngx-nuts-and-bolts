import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IScrollToErrorConfig, ScrollToErrorDirective, SCROLL_TO_ERROR_CONFIG } from './scroll-to-error.directive';

@NgModule({
	declarations: [ScrollToErrorDirective],
	imports: [CommonModule],
	exports: [ScrollToErrorDirective],
})
export class ScrollToErrorModule {
	public static withConfig(
		config: IScrollToErrorConfig = {
			errorSelector: '.error',
			highlightClass: 'highlight',
			highlightTargetSelector: '.form-field',
			highlightDurationMs: 1000,
			scrollOptions: { behavior: 'smooth' },
			focusTargetSelector: 'input',
		}
	): ModuleWithProviders<ScrollToErrorModule> {
		return {
			ngModule: ScrollToErrorModule,
			providers: [
				{
					provide: SCROLL_TO_ERROR_CONFIG,
					useValue: config,
				},
			],
		};
	}
}
