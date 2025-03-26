import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../_services/usuario.service';
import { UsuarioAuthService } from '../_services/usuario-auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../_services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService:UsuarioService,
    private usuarioAuth:UsuarioAuthService,
    private router:Router,
    public themeService:ThemeService) { }

  ngOnInit(): void {
  }

  cambiarTema(color:any){
    this.themeService.establecerTema(color);
  }

  login(loginFormulario:NgForm){
    try{
      this.usuarioService.login(loginFormulario.value).subscribe(
        (response: any) => {
          console.log(response);
          this.usuarioAuth.setRoles(response.usuario.role);
          this.usuarioAuth.setToken(response.jwtToken);

          const role2 = response.usuario.role[0].rolNombre;
          if (role2 === "Admin") {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/usuario']);
          }
        }
      );
    }catch(error) {
      console.log(error);
    }
    /*this.usuarioService.login(loginFormulario.value).subscribe(
      (response: any) => {
        this.usuarioAuth.setRoles(response.usuario.role);
        this.usuarioAuth.setToken(response.jwtToken);

        const role2 = response.usuario.role[0].rolnombre;
        if (role2 === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/usuario']);
        }
      },
      (error) => {
        console.log(error);
      }
    );*/

  }

  enviarRegistroUsuario(){
    this.router.navigate(["/registrarUsuario"]);
  }

}
