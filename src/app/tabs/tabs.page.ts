import { TabsService } from './tabs.service';
import { Component, OnInit, OnChanges } from '@angular/core';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  cameraDisabled: boolean;
  constructor(private tabsService: TabsService) {
     this.cameraDisabled = tabsService.SetCameraPageAccess();
   }
}

