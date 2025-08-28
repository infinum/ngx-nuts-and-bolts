import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomerLocation } from '../../types/customer-location';

@Component({
	selector: 'bea-location-details',
	imports: [CommonModule],
	templateUrl: './location-details.component.html',
})
export class LocationDetailsComponent {
	@Input() public location!: CustomerLocation;
}
