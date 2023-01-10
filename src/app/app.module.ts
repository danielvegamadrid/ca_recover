import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeadsComponent } from './leads/leads.component';
import { ConfigJsonComponent } from './config-json/config-json.component';

@NgModule({
  declarations: [
    AppComponent,
    LeadsComponent,
    ConfigJsonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'leads', component: LeadsComponent },
      { path: 'leads/config.json', component: ConfigJsonComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
