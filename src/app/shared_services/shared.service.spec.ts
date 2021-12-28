import { TestBed } from '@angular/core/testing';

import { SharedServices } from './shared.services';

describe('SharedService', () => {
  let service: SharedServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
