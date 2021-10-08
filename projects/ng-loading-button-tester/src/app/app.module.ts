import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgLoadingButtonModule } from 'ng-loading-button';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgLoadingButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
