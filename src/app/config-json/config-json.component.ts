import { Component } from '@angular/core';
import * as exampleData from '../../../src/config.json';

@Component({
  selector: 'app-config-json',
  templateUrl: './config-json.component.html',
  styleUrls: ['./config-json.component.scss']
})
export class ConfigJsonComponent {
  public example = JSON.stringify(exampleData);
}
