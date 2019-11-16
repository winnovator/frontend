import { DesignShop } from './../models/designshop';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CameraService } from './camera.service';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

describe('CameraService', () => {
  let httpTestingController: HttpTestingController;
  let service: CameraService;
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CameraService);
    localStorage.clear();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test Base64 Conversion', () => {

    it('test if no file is found to convert to base64', (done) => {
      service.firstFileToBase64(null).then((result: string) => {
        this.imgURI = result;
      }, (err: any) => {
        expect(err.message).toEqual('No file found');
      });
      done();
    });

    it('test file conversion to base64', (done) => {
      const file = new File(['f'], 'test-file.jpg', { lastModified: new Date().getTime(), type: 'image/jpeg' });
      service.firstFileToBase64(file).then((result: string) => {
        expect(result).toEqual('data:image/jpeg;base64,Zg==');
      });
      done();
    });
  });

  it('test upload file', (done) => {
    const file = new File(['f'], 'test-file.jpg', { lastModified: new Date().getTime(), type: 'image/jpeg' });
    service.uploadFile(file, 'test.jpg', 'https://localhost:44344/api/UploadImage/2182a411-6f44-4f3b-c6e8')
      .subscribe(data => {
      });

    const req = httpTestingController.expectOne('https://localhost:44344/api/UploadImage/2182a411-6f44-4f3b-c6e8');
    expect(req.request.body.get('uploadedFile')).toEqual(file);
    req.flush(null);
    done();
  });

  it('test upload Picture zonder sessionId', (done) => {
    const file = new File(['f'], 'test-file.jpg', { lastModified: new Date().getTime(), type: 'image/jpeg' });
    service.sendPicture(file, 'tester.jpg');
    expect(service.uploadStatus).toEqual(new BehaviorSubject<string>('Upload status: No sessionID available'));
    done();
    });

  it('test upload Picture met sessionId', (done) => {
    const file = new File(['f'], 'test-file.jpg', { lastModified: new Date().getTime(), type: 'image/jpeg' });
    const ds = new DesignShop();
    ds.id = '2182a411-6f44-4f3b-c2e1-03d54fbcdffc';
    ds.description = 'test';
    localStorage.setItem('ds', JSON.stringify(ds));
    service.sendPicture(file, 'test.jpg');
    const requ = httpTestingController.expectOne('https://localhost:44344/api/UploadImage/2182a411-6f44-4f3b-c2e1-03d54fbcdffc');
    expect(requ.request.body.get('uploadedFile')).toEqual(file);
    requ.flush('ok');
    done();
  });
});





