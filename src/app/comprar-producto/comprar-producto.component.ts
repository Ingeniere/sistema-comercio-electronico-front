import { Component, OnInit, Injector, NgZone } from '@angular/core';
import { DetallePedido } from '../_model/detalle-pedido.modelo';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../_model/producto.modelo';
import { ProductoService } from '../_services/producto.service';
import { NgForm } from '@angular/forms';
//import * as Razorpay from 'razorpay';

declare var Razorpay:any;

@Component({
  selector: 'app-comprar-producto',
  templateUrl: './comprar-producto.component.html',
  styleUrls: ['./comprar-producto.component.css']
})
export class ComprarProductoComponent implements OnInit {

  esPagoDeUnSoloProducto3:any;

  detalleProducto: Producto[]=[];

  detallePedido: DetallePedido = {
  nombreCompleto: "",
  direccion: "",
  numeroContacto: "",
  numeroAlternoContacto: "",
  transactionId: "",
  cantidadPedidoProductos: []
  }

  constructor(private activatedRoute:ActivatedRoute,
    private productoService:ProductoService,
    private router:Router,
    private injector:Injector) { }//esto "injector" nos sirve para poder redirigir una vez cancelado la comprar atraves de razorPay

  ngOnInit(): void {
    this.detalleProducto=this.activatedRoute.snapshot.data['productoDetalles'];//esto "productoDetalles: ComprarProductoResolverService" viene de app-routing-.module.ts
    this.esPagoDeUnSoloProducto3 = this.activatedRoute.snapshot.paramMap.get("esPagoDeUnSoloProducto");//este parametro "esPagoDeUnSoloProducto" lo recuperamos desde la cache del encabezado

    this.detalleProducto.forEach(
      x => this.detallePedido.cantidadPedidoProductos.push(
        {productoId: x.productoId, cantidad:1}//el 1 es cantidad minima que podemos seleccionar en el formulario
      )
    );

    console.log(this.detalleProducto)
    console.log(this.detallePedido);
  }

  realizarPedido(orderForm:NgForm){
    this.productoService.hacerPedido(this.detallePedido, this.esPagoDeUnSoloProducto3).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        //this.router.navigate(["/confirmacionPedido"]);
        const ngZone = this.injector.get(NgZone);// run: ejecuta cierto código dentro de la zona.
        ngZone.run(
          () => {
            this.router.navigate(["/confirmacionPedido"]);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerCantidadDeProductoAComprar(productoId:any){
    const filtrarProducto= this.detallePedido.cantidadPedidoProductos.filter(
      (cantidadProducto) => cantidadProducto.productoId===productoId
    );
    return filtrarProducto[0].cantidad
  }

  obtenerCalcularTotal(productoId:any, descuentoPrecioProducto:any){ //getCalculatedTotal()
    const filtrarProducto=this.detallePedido.cantidadPedidoProductos.filter(
      (cantidadProducto) => cantidadProducto.productoId===productoId
    );

    return filtrarProducto[0].cantidad*descuentoPrecioProducto;
  }

  cambiarCantidad(q:any, productId:any){//onQuantityChanged()
    this.detallePedido.cantidadPedidoProductos.filter(
      (orderProduct) => orderProduct.productoId === productId
    )[0].cantidad = q;
  }

  calcularLaCantidadTotal(){ //getCalculatedGrandTotal()
    let totalGeneral = 0;

    this.detallePedido.cantidadPedidoProductos.forEach(
      (cantidadProducto) => {
        const precio = this.detalleProducto.filter(product => product.productoId === cantidadProducto.productoId)[0].descuentoPrecioProducto;
        totalGeneral = totalGeneral + precio * cantidadProducto.cantidad;
      }
    );

    return totalGeneral;
  }

  createTransactionAndPlaceOrder(orderForm:NgForm){
    let cantidad = this.calcularLaCantidadTotal();
    this.productoService.crearTransaccionRazorPay(cantidad).subscribe(
      (response)=>{
        console.log(response);
        this.abrirTransaccionModal(response, orderForm);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  abrirTransaccionModal(response:any, orderForm:NgForm){
    var opciones ={
      //headers?: RazorpayHeaders;
      order_id: response.pedidoId,
      key: response.clave,
      amount:response.cantidad,
      currency: response.moneda,
      name: "Pago por compra",
      description: "pagos en linea",
      image: "https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg",
      handler:(response:any)=>{
        if(response!=null && response.razorpay_payment_id!=null){//esto "razorpay_payment_id" se obtiene desde razorPay
          this.respuestaDeProceso(response, orderForm);
        }else{
          alert("El pago fallo..")
        }
      },
      prefill:{
        name: "Alumno1",
        email: "Alumno1@gmail.com",
        contact:"789456"
      },
      notes:{
        address:"Examen en linea"
      },
      theme:{
        color: '#F37254'
      }
    };

    var razorPayObjeto = new Razorpay(opciones);
    razorPayObjeto.open();
  }

  respuestaDeProceso(response:any, orderForm:NgForm){
    //console.log(resp2);
    this.detallePedido.transactionId=response.razorpay_payment_id;//aqui estamos mandando lo que tiene este "razorpay_payment_id" a "transactionId"
    this.realizarPedido(orderForm);
  }

}
