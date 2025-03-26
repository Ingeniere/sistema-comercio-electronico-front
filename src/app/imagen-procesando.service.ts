import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from './_model/producto.modelo';
import { FileHandle } from './_model/identificador-archivo.modelo';

@Injectable({
  providedIn: 'root'
})
export class ImagenProcesandoService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Producto) {
    const productImages: any[] = product.productoImagenes;

    const productImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

      const finalFileHandle :FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productoImagenes = productImagesToFileHandle;
    return product;

  }

  public dataURItoBlob(picBytes:any, imageType:any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType});
    return blob;
  }
}
