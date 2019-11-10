import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { version, name } from '../../../package.json';

@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss']
})
export class InfoPage {
public appVersion;
public appName;

  constructor() {
    this.appVersion = version;
    this.appName = name;
  }
}


