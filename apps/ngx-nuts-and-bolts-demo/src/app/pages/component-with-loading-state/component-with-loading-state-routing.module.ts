import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentWithLoadingStateComponent } from './component-with-loading-state.component';

const routes: Routes = [
	{
		path: '',
		component: ComponentWithLoadingStateComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ComponentWithLoadingStateRoutingModule {}
