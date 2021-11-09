import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		MatToolbarModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
