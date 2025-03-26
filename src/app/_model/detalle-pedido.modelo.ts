import { CantidadPedido } from "./cantidad-pedido.modelo";

export interface DetallePedido {
  nombreCompleto: string;
  direccion: string;
  numeroContacto: string;
  numeroAlternoContacto: string;
  transactionId: string;
  cantidadPedidoProductos: CantidadPedido[];
}
