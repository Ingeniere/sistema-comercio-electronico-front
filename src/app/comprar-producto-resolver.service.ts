import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Producto } from './_model/producto.modelo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoService } from './_services/producto.service';
import { ImagenProcesandoService } from './imagen-procesando.service';

@Injectable({
  providedIn: 'root'
})
export class ComprarProductoResolverService implements Resolve<Producto[]>{

  constructor(private productoService:ProductoService,
    private imagenProcesandoService:ImagenProcesandoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Producto[] | Observable<Producto[]> | Promise<Producto[]> {

    const id2:any = route.paramMap.get("id");//esto "id" lo recibimos de ver-detalle-producto.components.ts del metodo comprarProducto(){}
    const esPagoDeUnSoloProducto2 = route.paramMap.get("esPagoDeUnSoloProducto");
    return this.productoService.obtenerDetallesProducto(esPagoDeUnSoloProducto2, id2)
      .pipe(
        map(
          (x: Producto[], i) => x.map((producto: Producto) => this.imagenProcesandoService.createImages(producto))
        )
      );
  }
  }

