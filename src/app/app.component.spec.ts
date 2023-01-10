import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ConfigJsonComponent } from './config-json/config-json.component';
import { LeadsComponent } from './leads/leads.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LeadsComponent,
        ConfigJsonComponent
      ],
    }).compileComponents();
  });
});
