import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentationPageTestingModule } from '../../components/documentation-page/documentation-page.testing.module';
import { ComponentWithLoadingStateComponent } from './component-with-loading-state.component';

describe('ComponentWithLoadingStateComponent', () => {
	let component: ComponentWithLoadingStateComponent;
	let fixture: ComponentFixture<ComponentWithLoadingStateComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DocumentationPageTestingModule],
			declarations: [ComponentWithLoadingStateComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ComponentWithLoadingStateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
