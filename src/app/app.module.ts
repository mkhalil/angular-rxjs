import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RxjsOperatorComponent } from './exhaust-map/rxjs-operator.component';

@NgModule({
  declarations: [
    AppComponent,
    RxjsOperatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
