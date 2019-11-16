import { TestBed } from '@angular/core/testing';

import { GlobalHttpInterceptorService } from './globalhttpinterceptorservice.service';

describe('GlobalHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [GlobalHttpInterceptorService]}));

  it('should be created', () => {
    const service: GlobalHttpInterceptorService = TestBed.get(GlobalHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
