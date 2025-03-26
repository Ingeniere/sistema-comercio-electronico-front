import { Producto } from "./producto.modelo";

export interface MiPedidoDetalle {
  pedidoId:number,
  pedidoNombre:string,
  direccionCompletaPedido:string,
  numeroContactoPedido:string,
  numeroAlternoContactoPedido:string,
  estadoPedido:string,
  montoPedido:number,
  producto:Producto,
  usuario:any
}
