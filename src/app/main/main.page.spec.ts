import { QrscanComponent } from './qrscan/qrscan.component';
import { TabsService } from './../tabs/tabs.service';
import { TabsPage } from './../tabs/tabs.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MainPage } from './main.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

@Component({selector: 'app-qrscan', template: ''})
class StubComponent {}

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPage, StubComponent] ,
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [TabsService, TabsPage],
      imports: [IonicModule.forRoot(), [HttpClientTestingModule], [FormsModule ]]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
