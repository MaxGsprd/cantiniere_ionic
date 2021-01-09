import { TestBed } from '@angular/core/testing';

import { Order.Service.TsService } from './order.service.ts.service';

describe('Order.Service.TsService', () => {
  let service: Order.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Order.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
