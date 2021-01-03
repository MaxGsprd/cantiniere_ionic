import { TestBed } from '@angular/core/testing';

import { CantiniereService } from './cantiniere.service';

describe('CantiniereService', () => {
  let service: CantiniereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantiniereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
