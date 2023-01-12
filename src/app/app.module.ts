import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PathLocationStrategy , LocationStrategy  } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'leads', component: AppComponent }
    ])
  ],
  providers: [
    {provide : LocationStrategy , useClass: PathLocationStrategy }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
