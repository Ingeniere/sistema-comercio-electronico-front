import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarImagenesProductoModalComponent } from './mostrar-imagenes-producto-modal.component';

describe('MostrarImagenesProductoModalComponent', () => {
  let component: MostrarImagenesProductoModalComponent;
  let fixture: ComponentFixture<MostrarImagenesProductoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarImagenesProductoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarImagenesProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
