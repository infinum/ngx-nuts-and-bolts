import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppComponent } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { AppModule } from './app.module';

@NgModule({
	imports: [AppModule, ServerModule, ServerTransferStateModule],
	bootstrap: [AppComponent],
})
export class AppServerModule {}
