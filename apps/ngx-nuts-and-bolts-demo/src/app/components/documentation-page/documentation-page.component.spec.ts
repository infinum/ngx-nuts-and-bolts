import { ComponentFixture, TestBed } from '@angular/core/testing';
import { attachUnsupportedMatchMediaMethods } from '../../../testing/media-matcher.testing';
import { DocumentationPageComponent } from './documentation-page.component';

describe('DocumentationPageComponent', () => {
	let component: DocumentationPageComponent;
	let fixture: ComponentFixture<DocumentationPageComponent>;

	beforeAll(() => {
		attachUnsupportedMatchMediaMethods();
	});

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DocumentationPageComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DocumentationPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
