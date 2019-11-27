

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CameraPage } from './camera.page';
import { CamComponent } from './cam/cam.component';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CameraPage }])
  ],
  exports: [CamComponent],
  declarations: [CameraPage, CamComponent]
})
export class CameraPageModule {}
