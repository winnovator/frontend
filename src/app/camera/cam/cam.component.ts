import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss'],
})
export class CamComponent implements OnInit {

  @ViewChild('pwaphoto', { static: false }) pwaphoto: ElementRef;

  imgURI: string = null;
  public uploadStatus: string;
  constructor(public cameraService: CameraService) {
    cameraService.data.subscribe(data => {
      this.uploadStatus = data;
    });
  }

  ngOnInit() {}

  openPWAPhotoPicker() {
    if (this.pwaphoto == null) {
      return;
    }
    console.log('click');
    this.pwaphoto.nativeElement.click();
  }

  uploadPWA(component: any) {

    if (component == null) {
      console.log('leeg');
      return;
    }

    const file = component.target.files[0] as File;
    this.cameraService.sendPicture(file, file.name);
    this.cameraService.firstFileToBase64(file).then((result: string) => {
        this.imgURI = result;
      }, (err: any) => {
        this.imgURI = null;
      });
  }

}