import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-homepage',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {}
