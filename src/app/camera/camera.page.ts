import { CameraService } from './camera.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss']
})
export class CameraPage {

  @ViewChild('pwaphoto', { static: false }) pwaphoto: ElementRef;

  imgURI: string = null;
  public uploadStatus: string;
  constructor(public cameraService: CameraService) {
    cameraService.data.subscribe(data => {
      this.uploadStatus = data;
    });
  }

  openPWAPhotoPicker() {
    if (this.pwaphoto == null) {
      return;
    }

    this.pwaphoto.nativeElement.click();
  }

  uploadPWA() {

    if (this.pwaphoto == null) {
      return;
    }

    const fileList: FileList = this.pwaphoto.nativeElement.files;

    if (fileList && fileList.length > 0) {
      this.cameraService.sendPicture(fileList[0], fileList[0].name);
      this.cameraService.firstFileToBase64(fileList[0]).then((result: string) => {
        this.imgURI = result;
      }, (err: any) => {
        this.imgURI = null;
      });
    }
  }
}


