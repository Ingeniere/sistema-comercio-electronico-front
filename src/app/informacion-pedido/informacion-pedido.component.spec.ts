import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPedidoComponent } from './informacion-pedido.component';

describe('InformacionPedidoComponent', () => {
  let component: InformacionPedidoComponent;
  let fixture: ComponentFixture<InformacionPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
