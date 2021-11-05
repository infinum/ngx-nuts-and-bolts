import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocumentationPageModule } from '../../components/documentation-page/documentation-page.module';
import { ComponentWithLoadingStateRoutingModule } from './component-with-loading-state-routing.module';
import { ComponentWithLoadingStateComponent } from './component-with-loading-state.component';

@NgModule({
	declarations: [ComponentWithLoadingStateComponent],
	imports: [CommonModule, DocumentationPageModule, ComponentWithLoadingStateRoutingModule],
})
export class ComponentWithLoadingStateModule {}
