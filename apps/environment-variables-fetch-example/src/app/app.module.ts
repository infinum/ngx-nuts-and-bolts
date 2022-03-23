/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EnvironmentVariablesModule } from '@infinumjs/ngx-nuts-and-bolts';
import {
	AppComponent,
	EnvironmentVariableValueModule,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, FormsModule, HttpClientModule, EnvironmentVariableValueModule, EnvironmentVariablesModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
