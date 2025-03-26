import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../_services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {

  desplazarTablaColumnas: string[]= ["Nombre", "Descripcion","Precio","Descuento Precio", "Accion"];

  detallesCarrito:any[] = [];

  constructor(private productoService:ProductoService,
    private router:Router) { }

  ngOnInit(): void {
    this.listarDetallesCarrito();
  }

  eliminarReserva(carritoId:any){
    //console.log(carritoId);
    this.productoService.eliminarDeCarritoProducto(carritoId).subscribe(
      (response)=>{
        console.log(response);
        this.listarDetallesCarrito();
    },(error)=>{
      console.log(error);
    })
  }

  listarDetallesCarrito(){
    this.productoService.listarDetallesDelCarrito().subscribe(
      (response:any)=>{
        console.log(response);
        this.detallesCarrito=response;
    },
    (error)=>{
      console.log(error);
    });
  }

  verificar(){
    this.router.navigate(["/comprarProducto",{
     esPagoDeUnSoloProducto:false, id:0
    }]);
    /*this.productoService.obtenerDetallesProducto(false , 0).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );*/
  }
}
