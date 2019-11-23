import { TabsService } from './../tabs/tabs.service';
import { TabsPage } from './../tabs/tabs.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { MainPage } from './main.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@innotec/ngx-scanner';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPage],
      providers: [TabsService, TabsPage, ZXingScannerModule],
      imports: [IonicModule.forRoot(), [HttpClientTestingModule], [FormsModule ], [ZXingScannerModule]]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on Device Select change - reset result', () => {
    component.qrResultString = 'test';
    component.onDeviceSelectChange('1234');
    expect(component.qrResultString).toEqual(null);
  });

});
