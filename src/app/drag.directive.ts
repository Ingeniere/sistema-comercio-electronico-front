import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from './_model/identificador-archivo.modelo';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public alArrastarAPista(evt: DragEvent) {//onDragOver
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public alArrastrarEnVivo(evt: DragEvent) {//onDragLeave
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public alArrastrarSalir(evt: DragEvent) {//onDrop
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";

    let fileHandle: FileHandle;

    const file:any = evt.dataTransfer?.files[0]
    const url = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );

    fileHandle = { file, url };
    this.files.emit(fileHandle);
  }
}
