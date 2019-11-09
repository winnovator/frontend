import { ServiceService } from './main.service';
import { TokenApiService } from './../services/token-api.service';
import { TabsService } from './../tabs/tabs.service';
import { DesignShop } from '../models/designshop';
import { DesignshopApiService } from '../services/designshop-api.service';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';




@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})


export class MainPage implements OnInit {
  designshops: DesignShop[];
  designshop: DesignShop;

  constructor(private designshopApiService: DesignshopApiService, private tabs: TabsPage,
              private tabsService: TabsService, private tokenApiService: TokenApiService,
              private serviceservice: ServiceService ) {}

  public async ngOnInit() {
    this.getDesignShops();
  }

  public optionsFn(): void {
    if (this.designshop != null) {
    localStorage.setItem('ds', JSON.stringify(this.designshop));
    this.tabs.cameraDisabled = this.tabsService.SetCameraPageAccess();
    }
  }

  public async getDesignShops() {
    await this.tokenApiService.getJWTToken().then(data =>
      this.designshopApiService.getDesignShops().subscribe(res => this.designshops = res)
    );
  }
}

