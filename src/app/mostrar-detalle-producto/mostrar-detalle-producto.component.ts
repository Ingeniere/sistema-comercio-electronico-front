import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../_services/producto.service';
import { Producto } from '../_model/producto.modelo';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { MostrarImagenesProductoModalComponent } from '../mostrar-imagenes-producto-modal/mostrar-imagenes-producto-modal.component';
import { ImagenProcesandoService } from '../imagen-procesando.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-detalle-producto',
  templateUrl: './mostrar-detalle-producto.component.html',
  styleUrls: ['./mostrar-detalle-producto.component.css']
})
export class MostrarDetalleProductoComponent implements OnInit {

  mostrarTabla=false;
  mostrarBotonDeCargaDeMasProducto=false;
  numeroPagina:number=0;

  productoDetalles: Producto[] = [];
  desplazeDeColumna: string[] = ['Id', 'Nombre-Producto', 'Descripcion-Producto', 'Descuento-Precio-Producto', 'Precio-Actual-Producto','Accion'];

  constructor(private productoService:ProductoService,
    public dialogoImagenes:MatDialog,
    private imagenProcesandoService:ImagenProcesandoService,
    private router:Router) { }

  ngOnInit(): void {
    this.listarProductosTodos();

  }

  buscarProductoPorClave(buscarPorClave:any){
    console.log(buscarPorClave);
    this.numeroPagina=0;
    this.productoDetalles=[];
    this.listarProductosTodos(buscarPorClave)
  }

  public listarProductosTodos(buscarProduct:string="") {//esto "buscarProduct:string=" es necesario para buscar productos dentro la lista
    this.mostrarTabla=false;
    this.productoService.listarTodosLosProductos(this.numeroPagina, buscarProduct)//aqui esto "this.numeroPagina" lo estamos necesitando para el paginador
    .pipe(
      map((x: Producto[], i) => x.map((product: Producto) => this.imagenProcesandoService.createImages(product)))
    )
    .subscribe((response: Producto[])=>{
      console.log(response);
      //this.productoDetalles = response;
      response.forEach(product=>this.productoDetalles.push(product))
      this.mostrarTabla=true;
      if(response.length==8){
        this.mostrarBotonDeCargaDeMasProducto=true;
      }
      else{
        this.mostrarBotonDeCargaDeMasProducto=false;
      }

    },(error:HttpErrorResponse)=>{
      console.log(error);
    })
  }

  cargarMasProductos() {
    this.numeroPagina = this.numeroPagina + 1;
    this.listarProductosTodos();
  }

  eliminarProducto(productoId:any){
    this.productoService.eliminarProducto(productoId).subscribe(
      (resp) => {
        console.log(resp);
        this.listarProductosTodos;
      },
      (error:HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  mostrarImagenes(product:Producto){
    console.log(product);
    this.dialogoImagenes.open(MostrarImagenesProductoModalComponent, {
      data: {
        images: product.productoImagenes
      },
      height: '500px',
      width: '800px'
    });
  }

  editarProducto(productoId:any){
    //console.log(productoId);
    this.router.navigate(['/AddNuevoProducto', {productoId2: productoId}]);
  }

}
