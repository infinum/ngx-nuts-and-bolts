import { Component } from '@angular/core';
import { moduleMetadata, Story } from '@storybook/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { ObserveResizeModule } from './observe-resize.module';

@Component({
	template: `
		<h2>Content rect:</h2>
		<pre>{{ measurements$ | async | json }}</pre>
		<button (click)="onAppendTextClick()">Append text</button>
		<button (click)="onToggleContentClick()">Toggle content</button>
		<div *ngIf="renderContent$ | async" (infObserveResize)="onResize($event)" class="content">
			{{ content$ | async }}
		</div>
	`,
	styles: [
		`
			.content {
				background: #cecece;
				padding: 15px;
			}
		`,
	],
})
class ObserveResizeStoryComponent {
	private readonly _renderContent$ = new BehaviorSubject<boolean>(true);
	public readonly renderContent$ = this._renderContent$.asObservable();
	private readonly _measurements$ = new Subject<ResizeObserverEntry>();
	public readonly measurements$ = this.createMeasurements(this._measurements$);
	private readonly _content$ = new Subject<string>();
	public readonly content$ = this.createContent(this._content$);

	public onAppendTextClick(): void {
		this._content$.next('Lorem ipsum dolor sit amet. ');
	}

	public onResize(entries: ResizeObserverEntry): void {
		this._measurements$.next(entries);
	}

	public onToggleContentClick(): void {
		this._renderContent$.next(!this._renderContent$.value);
	}

	public createContent(content$: Observable<string>): Observable<string> {
		return content$.pipe(scan((acc, value) => acc + value, ''));
	}

	public createMeasurements(measurements$: Observable<ResizeObserverEntry>): Observable<DOMRectReadOnly> {
		return measurements$.pipe(map((measurement) => measurement.contentRect));
	}
}

export default {
	title: 'ObserveResize',
	component: ObserveResizeStoryComponent,
	decorators: [
		moduleMetadata({
			declarations: [ObserveResizeStoryComponent],
			imports: [ObserveResizeModule],
		}),
	],
};

const Template: Story<ObserveResizeStoryComponent> = (args: ObserveResizeStoryComponent) => ({
	component: ObserveResizeStoryComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
