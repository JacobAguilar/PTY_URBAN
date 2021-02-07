import { TestBed } from '@angular/core/testing';

import { MicroserviciorestService } from './microserviciorest.service';

describe('MicroserviciorestService', () => {
  let service: MicroserviciorestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroserviciorestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
