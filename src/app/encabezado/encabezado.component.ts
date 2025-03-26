import { Component, OnInit } from '@angular/core';
import { UsuarioAuthService } from '../_services/usuario-auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../_services/usuario.service';
import { ThemeService } from '../_services/theme.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(public usuarioAuth:UsuarioAuthService,
    private router:Router,
    private usuarioService:UsuarioService,
    public themeService:ThemeService) { }

  ngOnInit(): void {
  }

  cambiarTema(color:any){
    this.themeService.establecerTema(color);
  }

  public estaLogueado() {
    return this.usuarioAuth.isLoggedIn();
  }

  public logout() {
    this.usuarioAuth.clear();
    this.router.navigate(['/']);
  }

  public isAdmin() {
    return this.usuarioAuth.isAdmin();
  }

  public isUser() {
    return this.usuarioAuth.isUser();
  }

}
