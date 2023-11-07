import { TestBed } from '@angular/core/testing';

import { RegistroPontosApiService } from './registro-pontos-api.service';

describe('RegistroPontosApiService', () => {
  let service: RegistroPontosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPontosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
