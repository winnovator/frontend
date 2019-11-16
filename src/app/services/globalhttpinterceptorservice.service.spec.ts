import { TestBed } from '@angular/core/testing';

import { GlobalhttpinterceptorserviceService } from './globalhttpinterceptorservice.service';

describe('GlobalhttpinterceptorserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalhttpinterceptorserviceService = TestBed.get(GlobalhttpinterceptorserviceService);
    expect(service).toBeTruthy();
  });
});
