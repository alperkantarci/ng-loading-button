import { TestBed } from '@angular/core/testing';

import { NgLoadingButtonService } from './ng-loading-button.service';

describe('NgLoadingButtonService', () => {
  let service: NgLoadingButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgLoadingButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
