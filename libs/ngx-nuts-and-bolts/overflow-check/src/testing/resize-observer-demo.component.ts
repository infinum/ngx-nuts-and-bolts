import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OverflowCheckModule } from '../overflow-check.module';

@Component({
	selector: 'inf-resize-observer-demo',
	standalone: true,
	imports: [CommonModule, OverflowCheckModule],
	templateUrl: './resize-observer-demo.component.html',
	styleUrls: ['./resize-observer-demo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizeObserverDemoComponent {
	protected readonly items = [
		'a',
		'ab',
		'abc',
		'abcd',
		'asdasdasdasdadasdas',
		'asdawd',
		'jasld jaslkdjaslk laksd',
		'as asdasd a',
	];
}
