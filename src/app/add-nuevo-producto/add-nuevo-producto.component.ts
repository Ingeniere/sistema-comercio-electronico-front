import { Component, OnInit } from '@angular/core';
import { Producto } from "../_model/producto.modelo";
import { NgForm } from '@angular/forms';
import { ProductoService } from '../_services/producto.service';
import { FileHandle } from '../_model/identificador-archivo.modelo';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-nuevo-producto',
  templateUrl: './add-nuevo-producto.component.html',
  styleUrls: ['./add-nuevo-producto.component.css']
})
export class AddNuevoProductoComponent implements OnInit {
  esNuevoProducto = true;

  producto: Producto = {
    productoId: null,
    nombreProducto: "",
    descripcionProducto: "",
    descuentoPrecioProducto: 0,
    precioActualProducto: 0,
    productoImagenes: [],
  };

  constructor(private productoService:ProductoService,
    private sanitizer:DomSanitizer,
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    //esto lo estamos usando para actualizar un producto lo recuperamos en le formulario vacio por eso lo metemos en this.producto
    this.producto=this.activateRoute.snapshot.data['producto']//esto "producto" viene de app-routing-module.ts de la linea 36 que recibe valor de ProductoResoleService.ts
    if(this.producto && this.producto.productoId){
      this.esNuevoProducto=false;
    }
  }

  addProducto(productForm:NgForm){

    const formData = this.prepararFormularioProducto(this.producto);

    this.productoService.addProduct(formData).subscribe(
      (response: Producto) => {// es response: Producto porque se dijo que es ese tipo en producto.service.ts en el metodo addProduct
        productForm.reset();
        this.producto.productoImagenes = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepararFormularioProducto(producto2: Producto): FormData {
    const uploadImageData = new FormData();
    uploadImageData.append(
      "producto",//este viene desde el backend ProductoController.java de la linea 25 el que esta en comilla
      new Blob([JSON.stringify(producto2)], { type: "application/json" })
    );

    for (var i = 0; i < this.producto.productoImagenes.length; i++) {
      uploadImageData.append(
        "imageFile",//este viene desde el backend ProductoController.java de la linea 26 el que esta en comilla
        this.producto.productoImagenes[i].file,
        this.producto.productoImagenes[i].file.name
      );
    }
    return uploadImageData;
  }

  elArchivoSeleccionado(event:any){
      if (event.target.files) {
      const file2 = event.target.files[0];
      const identificadoArchivo: FileHandle = {
        file: file2,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file2)
        ),
      };
      this.producto.productoImagenes.push(identificadoArchivo);
    }
  }

  removerImagen(i:number){
    this.producto.productoImagenes.splice(i, 1);
  }

  abandonarArchivo(indentificadorArchivo: FileHandle){// esto "indentificadorArchivo" es lo que viene del html
    this.producto.productoImagenes.push(indentificadorArchivo);
  }

}
