import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createQueryParamReader } from '@infinum/ngx-nuts-and-bolts/query-params-reader';
import { z } from 'zod';
@Component({
	standalone: true,
	imports: [RouterModule],
	selector: 'inf-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	private readonly paginationParamsManager = createQueryParamReader(
		z.object({ pageSize: z.number(), pageNumber: z.number() })
	);
	private readonly someOtherParamData = createQueryParamReader(z.object({ name: z.string(), surname: z.string() }));

	protected setParams() {
		this.paginationParamsManager().write({ pageSize: 10, pageNumber: 1 });
	}

	protected readParams() {
		console.log(this.paginationParamsManager().read());
	}
}
