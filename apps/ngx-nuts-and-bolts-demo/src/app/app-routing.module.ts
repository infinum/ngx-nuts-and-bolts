import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutePath } from './app-route-path.enum';

const routes: Routes = [
	{
		path: AppRoutePath.HOME,
		loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: AppRoutePath.COMPONENT_WITH_LOADING_STATE,
		loadChildren: () =>
			import('./pages/component-with-loading-state/component-with-loading-state.module').then(
				(m) => m.ComponentWithLoadingStateModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
