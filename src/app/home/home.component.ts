import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../_services/producto.service';
import { Producto } from '../_model/producto.modelo';
import { map } from 'rxjs/operators';
import { ImagenProcesandoService } from '../imagen-procesando.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ThemeService } from '../_services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mostrarBotonDeCarga=false;
  numeroPagina:number= 0;
  productoDetalles:any = [];

  constructor(private productoService:ProductoService,
    private imagenProcesandoService:ImagenProcesandoService,
    private router:Router,
    public themeService:ThemeService) { }

  ngOnInit(): void {
    this.listarProductosTodos();
  }

  cambiarTema(color:any){
    this.themeService.establecerTema(color);
  }

  public buscarProductoPorClave(buscarPorClave:any){
    console.log(buscarPorClave);
    this.numeroPagina=0;
    this.productoDetalles=[];
    this.listarProductosTodos(buscarPorClave);
  }

  public listarProductosTodos(idBuscar: string="") {//eso "idBuscar: string=""" lo usamos solo para la busqueda de producto
    this.productoService.listarTodosLosProductos(this.numeroPagina, idBuscar)
    .pipe(
      map((x: Producto[], i) => x.map((product: Producto) => this.imagenProcesandoService.createImages(product)))
    )
    .subscribe((response: Producto[])=>{
      console.log(response);
      if(response.length == 8) {
        this.mostrarBotonDeCarga = true;
      } else {
        this.mostrarBotonDeCarga = false;
      }
      //this.productoDetalles = response;
      response.forEach(p => this.productoDetalles.push(p));
    },(error:HttpErrorResponse)=>{
      console.log(error);
    })
  }

  cargarMasPrducto(){
    this.numeroPagina = this.numeroPagina + 1;
    this.listarProductosTodos();
  }

  verDetalleProducto(productoId:any){
    this.router.navigate(["/verDatalleDeProducto",{productoId2:productoId}])
  }

}
