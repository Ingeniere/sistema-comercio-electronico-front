import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-mostrar-imagenes-producto-modal',
  templateUrl: './mostrar-imagenes-producto-modal.component.html',
  styleUrls: ['./mostrar-imagenes-producto-modal.component.css']
})
export class MostrarImagenesProductoModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.recibirImagenes();
  }

  recibirImagenes() {
    console.log(this.data);
  }

}
