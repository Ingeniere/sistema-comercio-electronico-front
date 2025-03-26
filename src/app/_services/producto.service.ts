import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../_model/producto.modelo';
import { DetallePedido } from '../_model/detalle-pedido.modelo';
import { MiPedidoDetalle } from '../_model/mi-pedido-detalle.modelo';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient: HttpClient) { }

  public crearTransaccionRazorPay(cantidad:any){
    return this.httpClient.get("http://localhost:8080/crearTransaccion/"+cantidad)
  }

  public marcarComoEntregadoPedido(pedidoId:any){
    return this.httpClient.get("http://localhost:8080/marcarComoEntregado/"+pedidoId)
  }

  public obtenerDetalleDeTodosLosPedidosParaAdmin(estado:string): Observable<MiPedidoDetalle[]>{
    return this.httpClient.get<MiPedidoDetalle[]>("http://localhost:8080/obtenerTodosLosDetallesPedido/"+estado)
  }

  public obtenerDetallesDeMiPedido(): Observable<MiPedidoDetalle[]>{//ojo en este listado estamos usando Observable de tipo matriz
    return this.httpClient.get<MiPedidoDetalle[]>("http://localhost:8080/obtenerDetallesPedido");
  }

  public eliminarDeCarritoProducto(carritoId:any){
    return this.httpClient.delete("http://localhost:8080/eliminarCarrito/"+carritoId)
  }

  public addProduct(producto: FormData) {
    return this.httpClient.post<Producto>("http://localhost:8080/adicionarProducto", producto);
  }

  public listarTodosLosProductos(numeroPagina:any, buscarProducto:string="") {
    return this.httpClient.get<Producto[]>("http://localhost:8080/listarLosProductos?numeroPagina="+numeroPagina+"&buscarPorId="+buscarProducto);
  }

  public eliminarProducto(productoId: number) {
    return this.httpClient.delete("http://localhost:8080/eliminarDetalleProducto/"+productoId);
  }
  //esto lo estamos utilizando para actualizar el producto
  public listarProductoDetallePorId(productId:any) {
    return this.httpClient.get<Producto>("http://localhost:8080/listarProductoDetallePorId/"+productId);
  }

  public obtenerDetallesProducto(esPagoDeUnSoloProducto:any, productoId:number) {
    return this.httpClient.get<Producto[]>("http://localhost:8080/obtenerDetallesDelProducto/"+esPagoDeUnSoloProducto+"/"+productoId);
  }
  public hacerPedido(detallePedido: DetallePedido, esPagoDeUnSoloProducto:any){
    return this.httpClient.post("http://localhost:8080/hacerPedido/"+esPagoDeUnSoloProducto, detallePedido);
  }

  public adicionarCompraACarrito(carritoId:number){
    return this.httpClient.get("http://localhost:8080/adicionarCarrito/"+carritoId);
  }

  public listarDetallesDelCarrito(){
    return this.httpClient.get("http://localhost:8080/listarCarrito");
  }

}
