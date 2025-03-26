import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  establecerTema(tema:string){//setTheme
    this.aplicarTema(tema);
    localStorage.setItem('themeColor',tema);
  }

  private aplicarTema(tema:string){//applyTheme
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('primary-theme','accent-theme','warn-theme');
    body.classList.add(`${tema}-theme`);
  }

  obtenerTema():ThemePalette{
    if(localStorage.getItem('themeColor')===null || localStorage.getItem('themeColor')===undefined){
      return 'primary';
    }
    else{
      const estadoTemaColor = localStorage.getItem('themeColor');
      return estadoTemaColor as ThemePalette;
    }
  }
}
