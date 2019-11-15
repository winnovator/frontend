import { ServiceService } from './main.service';
import { TokenApiService } from './../services/token-api.service';
import { TabsService } from './../tabs/tabs.service';
import { DesignShop } from '../models/designshop';
import { DesignshopApiService } from '../services/designshop-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { ZXingScannerComponent } from '@innotec/ngx-scanner';




@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})


export class MainPage implements OnInit {

  @ViewChild('scan', { static: true, read: false }) scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  designshops: DesignShop[];
  designshop: DesignShop;

  constructor(private designshopApiService: DesignshopApiService, private tabs: TabsPage,
    private tabsService: TabsService, private tokenApiService: TokenApiService) { }

  public ngOnInit(): void {


    //this.getDesignShops();

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;

      //selects the devices's back camera by default
      for (const device of devices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.selectedDevice = device;
          break;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.qrResultString = resultString;
    this.selectedDevice = null;
  }

  onDeviceSelectChange(selectedValue: string) {
    this.qrResultString = null;
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
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

