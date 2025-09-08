import { TestBed } from '@angular/core/testing';

import { NgxKeysService } from './ngx-keys.service';

describe('NgxKeysService', () => {
  let service: NgxKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
