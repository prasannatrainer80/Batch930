import { TestBed } from '@angular/core/testing';

import { FormStatusService } from './form-status.service';

describe('FormStatusService', () => {
  let service: FormStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
