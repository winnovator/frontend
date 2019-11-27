import { Component, OnInit, ViewChild } from '@angular/core';
import { AppToken } from 'src/app/models/apptoken';
import { DesignshopApiService } from 'src/app/services/designshop-api.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { TabsPage } from 'src/app/tabs/tabs.page';
import { TabsService } from 'src/app/tabs/tabs.service';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.component.html',
  styleUrls: ['./qrscan.component.scss'],
})
export class QrscanComponent implements OnInit {

  @ViewChild('scan', { static: true, read: false }) scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;
  scannerEnabled = false;
  qrResultString: string;
  sessionName: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo = null;

  constructor(private designshopApiService: DesignshopApiService, private tabs: TabsPage, private tabsService: TabsService) { }

  public ngOnInit(): void {
    this.scanner.camerasFound.subscribe(async (devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;
      this.selectedDevice = null;
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
    this.selectedDevice = null;
  }



  async handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
    const appToken: AppToken = await this.designshopApiService.getDesignShopAppToken(resultString);
    if (appToken) {
      this.tabs.cameraDisabled = this.tabsService.SetCameraPageAccess();
      this.sessionName = appToken.shopDescription;
    } else {
      this.tabs.cameraDisabled = this.tabsService.SetCameraPageAccess();
      this.sessionName = 'not available, scan other QRcode';
    }
    this.selectedDevice = null;
  }

  onDeviceSelectChange(selectedValue: string) {
    console.log('selected: ' + selectedValue);
    this.qrResultString = null;
    this.scannerEnabled = true;
    if (this.availableDevices) {
      const device = this.availableDevices.find(x => x.deviceId === selectedValue);
      this.selectedDevice = device || null;
    } else {
      this.selectedDevice = null;
    }
  }

}
