import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Producto } from './_model/producto.modelo';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoService } from './_services/producto.service';
import { ImagenProcesandoService } from './imagen-procesando.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoResolveService implements Resolve<Producto> {

  constructor(private productoService:ProductoService,
    private imagenProcensadoService:ImagenProcesandoService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Producto> {
    const id = route.paramMap.get("productoId2");

    if (id) {
      //entonces tenemos que obtener detalles del backend
       return this.productoService.listarProductoDetallePorId(id)
              .pipe(
                map(p => this.imagenProcensadoService.createImages(p))
              );
    } else {
      // devolver producto vacío observable.
      return of(this.listarProductoDetalles());
    }
  }

  listarProductoDetalles() {
    return {
      productoId:null,
      nombreProducto: "",
      descripcionProducto: "",
      descuentoPrecioProducto: 0,
      precioActualProducto: 0,
      productoImagenes: [],
    };
  }
}
