import { ServiceService } from './main.service';
import { TabsService } from './../tabs/tabs.service';
import { DesignShop } from '../models/designshop';
import { DesignshopApiService } from '../services/designshop-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { ZXingScannerComponent } from '@innotec/ngx-scanner';
import { AppToken } from '../models/apptoken';

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
  sessionName: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  constructor(private designshopApiService: DesignshopApiService, private tabs: TabsPage, private tabsService: TabsService) { }

  readonly sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  public ngOnInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;

      //selects the devices's back camera by default
      for (const device of devices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.sleep(1000).then(() => { });
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

  async handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
    const appToken: AppToken = await this.designshopApiService.getDesignShopAppToken(resultString);

    if (appToken) {
      this.tabs.cameraDisabled = this.tabsService.SetCameraPageAccess();
      this.sessionName = appToken.shopDescription;
    } else {
      this.tabs.cameraDisabled = this.tabsService.SetCameraPageAccess();
      this.sessionName = '';
    }
    this.selectedDevice = null;
  }

  onDeviceSelectChange(selectedValue: string) {
    this.qrResultString = null;
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }
}

