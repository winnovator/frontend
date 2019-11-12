import { designshop } from './../mocks/designshop';
import { TestBed } from '@angular/core/testing';

import { DesignshopApiService } from './designshop-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DesignshopApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: DesignshopApiService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [DesignshopApiService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DesignshopApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should return 2 sessions', (done) => {
    const dsMock = designshop;
    service.getDesignShops().subscribe(designShop => {
      expect(designShop[0].id).toEqual('2182a411-6f44-4f3b-c6e8-08d74fbcdf7c');
      expect(designShop[0].description).toEqual('Voltijd DesignShop 18-10-2019');
      expect(designShop[1].id).toEqual('2182a411-6f44-4f3b-c2e1-03d54fbcdffc');
      expect(designShop[1].description).toEqual('Verslaving DesignShop');
    });

    const req = httpTestingController.expectOne('https://localhost:44344/api/DesignShop/');
    req.flush(dsMock);
    done();
  });

  it('it should return no sessions', (done) => {
    const dsMock = null;
    service.getDesignShops().subscribe(designShop => {
      expect(designShop).toEqual(null);
    });

    const req = httpTestingController.expectOne('https://localhost:44344/api/DesignShop/');
    req.flush(dsMock);
    done();
  });
});
