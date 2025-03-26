import { Component, OnInit } from '@angular/core';
import { Producto } from '../_model/producto.modelo';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../_services/producto.service';

@Component({
  selector: 'app-ver-detalle-producto',
  templateUrl: './ver-detalle-producto.component.html',
  styleUrls: ['./ver-detalle-producto.component.css']
})
export class VerDetalleProductoComponent implements OnInit {

  seleccionarProductoIndex=0;
  producto:any;//aqui probe con "Producto[]=[] ;" no da error pero no funciona

  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,
    private productoService:ProductoService) { }

  ngOnInit(): void {
    this.producto=this.activatedRoute.snapshot.data['producto']
  }

  adicionarAlCarrito(productoId:any){
    this.productoService.adicionarCompraACarrito(productoId).subscribe((response)=>{
      console.log(response);
    },(error)=>{
      console.log(error);
    });
  }

  cambiarIndice(index:any) {
    this.seleccionarProductoIndex = index;
  }

  comprarProducto(productoId:any){
    this.router.navigate(["/comprarProducto",{
      esPagoDeUnSoloProducto:true, id:productoId
    }]);//los parametros "esPagoDeUnSoloProducto" y "id" se envian a comprar-producto-resolve.service.ts
  }

}
