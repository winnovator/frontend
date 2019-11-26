import { QrscanComponent } from './qrscan/qrscan.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainPage } from './main.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ZXingScannerModule,
    RouterModule.forChild([{ path: '', component: MainPage }])
  ],
  exports: [ QrscanComponent],
  declarations: [MainPage, QrscanComponent]
})
export class MainPageModule {}
