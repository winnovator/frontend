import { TabsPage } from 'src/app/tabs/tabs.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QrscanComponent } from './qrscan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QrscanComponent', () => {
  let component: QrscanComponent;
  let fixture: ComponentFixture<QrscanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [[ZXingScannerModule], [TabsPage]],
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
});
