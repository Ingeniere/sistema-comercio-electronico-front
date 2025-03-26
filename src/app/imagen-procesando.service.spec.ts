import { TestBed } from '@angular/core/testing';

import { ImagenProcesandoService } from './imagen-procesando.service';

describe('ImagenProcesandoService', () => {
  let service: ImagenProcesandoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenProcesandoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
