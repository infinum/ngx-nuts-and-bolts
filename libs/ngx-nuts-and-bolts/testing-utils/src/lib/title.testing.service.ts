import { Provider } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ExtractPublic } from './extract-public.type';

export class TitleTestingService implements ExtractPublic<Title> {
	private title = '';

	public getTitle(): string {
		return this.title;
	}

	public setTitle(newTitle: string): void {
		this.title = newTitle;
	}
}

export function provideTestingTitleService(): Provider {
	return {
		provide: Title,
		useClass: TitleTestingService,
	};
}
