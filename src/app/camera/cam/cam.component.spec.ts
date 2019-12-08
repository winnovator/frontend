import { CameraService } from './../camera.service';
import { CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamComponent } from './cam.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { $ } from 'protractor';

class MockCameraService extends CameraService {

  constructor(http: any) {
    super(http);
    }
  public result: boolean;
  sendPicture(blob: any, name: string) {
    this.result = true;
  }

  firstFileToBase64(fileImage: File): Promise<{}> {
    return new Promise(() => {
    this.result = true;
  });
}
}


describe('CamComponent', () => {
  let component: CamComponent;
  let fixture: ComponentFixture<CamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamComponent],
      imports: [ HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('test UploadPWA function with a file', () => {
    const file = new File(['f'], 'test-file.jpg', { lastModified: new Date().getTime(), type: 'image/jpeg' });
    const fileList = {
      target: {
        files: {
          0: file,
          length: 1,
          item: () => file
        }
      }
    };

    component.uploadPWA(fileList);
    expect(component).toBeTruthy();
  });

  it('test UploadPWA function without a file', () => {
    component.uploadPWA(null);
    expect(component).toBeTruthy();
  });

  it('test orientationState', () => {
    component.updateOrientatioState();
    console.log('width: ' + window.innerWidth);
    console.log('height: ' + window.innerHeight);
    if
     (window.innerHeight > window.innerWidth) {
      expect(component.state).toEqual('portrait');
    } else {
      expect(component.state).toEqual('landscape');
    }
  });

});
