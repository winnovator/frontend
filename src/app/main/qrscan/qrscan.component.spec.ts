import { DesignshopApiService } from 'src/app/services/designshop-api.service';
import { DesignShopAppToken } from './../../mocks/designshopapptoken';
import { TabsPage } from 'src/app/tabs/tabs.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QrscanComponent } from './qrscan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QRCodeEncoder } from '@zxing/library';

describe('QrscanComponent', () => {
  let component: QrscanComponent;
  let fixture: ComponentFixture<QrscanComponent>;
  let designshopApiServiceSpy : jasmine.SpyObj<DesignshopApiService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('DesignShopApiService', ['getDesignShopAppToken']);
    TestBed.configureTestingModule({
      providers: [[ZXingScannerModule], [TabsPage], [QrscanComponent, {provide: DesignshopApiService, useValue: spy}]],
      declarations: [ QrscanComponent],
      imports: [ [ZXingScannerModule], [HttpClientTestingModule]],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GetDesignShoptoken - it should set SessionName', async (done) => {
    component = TestBed.get(QrscanComponent);
    designshopApiServiceSpy = TestBed.get(DesignshopApiService);
    const value = DesignShopAppToken;
    designshopApiServiceSpy.getDesignShopAppToken.and.returnValue(Promise.resolve(value));
    await component.handleQrCodeResult('123');
    expect(component.sessionName).toEqual('test sessie');
    done();
  });

  it('GetDesignShoptoken result is null - it should not set SessionName', async () => {
    component = TestBed.get(QrscanComponent);
    designshopApiServiceSpy = TestBed.get(DesignshopApiService);
    designshopApiServiceSpy.getDesignShopAppToken.and.returnValue(Promise.resolve(null));
    await component.handleQrCodeResult('123');
    expect(component.sessionName).toEqual('');
  });

  it('Test onDeviceSelectChange', async () => {
    component = TestBed.get(QrscanComponent);
    component.onDeviceSelectChange('t');
    expect(component.selectedDevice).toEqual(null);
  });
});
