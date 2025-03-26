import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../_services/producto.service';
import { ThemeService } from '../_services/theme.service';

@Component({
  selector: 'app-informacion-pedido',
  templateUrl: './informacion-pedido.component.html',
  styleUrls: ['./informacion-pedido.component.css']
})
export class InformacionPedidoComponent implements OnInit {

  desplazarColumnasDeTabla: string[]=["Id","Nombre de Producto","Nombre","Direccion", "Telefono","Estado","Accion"];
  fuenteDeDato:any=[];

  estado2:string="Todo";//Ese todo tiene que ser igual lo que esta en el Backend para listarlos

  constructor(private productoService:ProductoService,
              public themeService:ThemeService
  ) { }

  ngOnInit(): void {
    this.obtenerTodosLosPedidosParaAdmin(this.estado2);
  }

  cambiarTema(color:any){
    this.themeService.establecerTema(color);
  }

  obtenerTodosLosPedidosParaAdmin(parametroDeEstado:string){
    this.productoService.obtenerDetalleDeTodosLosPedidosParaAdmin(parametroDeEstado).subscribe(
      (response)=>{
        this.fuenteDeDato=response;
        console.log(response);
      }, (error)=>{
        console.log(error);
      }
    );
  }

  marcarComoEntregado(pedidoId:number){
    console.log(pedidoId);
    this.productoService.marcarComoEntregadoPedido(pedidoId).subscribe(
      (response)=>{
        this.productoService.obtenerDetalleDeTodosLosPedidosParaAdmin(this.estado2);
        console.log(response);
      },(error)=>{
        console.log(error);
      }
    )
  }

}
