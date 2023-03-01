import { TestBed } from '@angular/core/testing';

import { MainSubService } from './main-sub.service';

describe('MainSubService', () => {
  let service: MainSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
