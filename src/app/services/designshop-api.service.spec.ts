import { DesignShopAppToken } from '../mocks/designshopapptoken';
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
    const dsAppTokenMock = DesignShopAppToken;
    service.getDesignShopAppToken('12345').then(data => {
      expect(data.shopDescription).toEqual('test sessie');
      expect(data.shopId).toEqual('789');
      expect(data.token).toEqual('1234567890abc');
    }
    );
    const req = httpTestingController.expectOne('https://localhost:44344/api/DesignShop/12345/apptoken');
    req.flush(dsAppTokenMock);
    done();
  });

});
