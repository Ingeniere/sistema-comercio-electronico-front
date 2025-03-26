import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../_services/producto.service';
import { MiPedidoDetalle } from '../_model/mi-pedido-detalle.modelo';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  desplazarTablaColumnas=["Nombre","Direccion","Numero Telefono","Cantidad","Estado"];
  miPedidoDetalle:MiPedidoDetalle[]=[];

  constructor(private productoService:ProductoService) { }

  ngOnInit(): void {
    this.obtenerDetallesPedido();
  }

  obtenerDetallesPedido(){
    this.productoService.obtenerDetallesDeMiPedido().subscribe(
      (response:MiPedidoDetalle[])=>{//aqui me permite listar en matriz por el Observable que declaramos en el producto.service.ts
        console.log(response);
        this.miPedidoDetalle= response;
      }, (error)=>{
        console.log(error);
      }
    )
  }

}
