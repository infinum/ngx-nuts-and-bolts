import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationDetailsComponent } from './location-details.component';

describe('LocationDetailsComponent', () => {
	let component: LocationDetailsComponent;
	let fixture: ComponentFixture<LocationDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [LocationDetailsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(LocationDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
