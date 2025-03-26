import { TestBed } from '@angular/core/testing';

import { ProductoResolveService } from './ProductoResolveService';

describe('ProductoResolveService', () => {
  let service: ProductoResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
