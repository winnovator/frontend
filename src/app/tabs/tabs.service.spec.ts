import { TestBed } from '@angular/core/testing';

import { TabsService } from './tabs.service';

describe('TabsService', () => {
  beforeEach(() => {
    localStorage.removeItem('ds');
    TestBed.configureTestingModule({});
  }
  );

  afterEach(() => {
    localStorage.removeItem('ds');
  });


  it('should be created', () => {
    const service: TabsService = TestBed.get(TabsService);
    expect(service).toBeTruthy();
  });

  it('if no session chosen, camera is disabled', () => {
    const service: TabsService = TestBed.get(TabsService);
    expect(service.SetCameraPageAccess()).toBe(true);
  });

  it('if session chosen, camera is enabled', () => {
    const service: TabsService = TestBed.get(TabsService);
    localStorage.setItem('ds', JSON.stringify(''));
    expect(service.SetCameraPageAccess()).toBe(false);
  });
});
