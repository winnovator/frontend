import { CameraService } from './../Camera/camera.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  private cameraDisabled: boolean;
  constructor() { }

  public SetCameraPageAccess(): boolean {
    if (localStorage.getItem('ds') !== null) {
      this.cameraDisabled = false;
    } else {
      this.cameraDisabled = true;
    }
    return this.cameraDisabled;
  }
}
