import { TestBed } from '@angular/core/testing';

import { ComprarProductoResolverService } from './comprar-producto-resolver.service';

describe('ComprarProductoResolverService', () => {
  let service: ComprarProductoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprarProductoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
