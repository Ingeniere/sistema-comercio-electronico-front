import { FileHandle } from "./identificador-archivo.modelo";


export interface Producto {
    productoId: null,
    nombreProducto: string,
    descripcionProducto: string,
    descuentoPrecioProducto: number,
    precioActualProducto: number,
    productoImagenes: FileHandle[]
}
