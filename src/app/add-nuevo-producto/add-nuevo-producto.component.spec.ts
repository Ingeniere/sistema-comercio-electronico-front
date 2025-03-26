import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNuevoProductoComponent } from './add-nuevo-producto.component';

describe('AddNuevoProductoComponent', () => {
  let component: AddNuevoProductoComponent;
  let fixture: ComponentFixture<AddNuevoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNuevoProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNuevoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
