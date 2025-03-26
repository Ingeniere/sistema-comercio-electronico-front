import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioAuthService } from './usuario-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  PATH_OF_API="http://localhost:8080";

  solicitudEncabezado = new HttpHeaders(
    {"No-Auth":"True"}
  )

  constructor(private httpClient:HttpClient, private usuarioAuth:UsuarioAuthService) { }

  public registrarUsuario(registrarDatos:any) {
    return this.httpClient.post(this.PATH_OF_API + '/registrarUsuario', registrarDatos);
  }

  public login(loginDatos:any){
    return this.httpClient.post(this.PATH_OF_API+"/autenticacion", loginDatos, {headers: this.solicitudEncabezado})
  }

  public forUser() {
    return this.httpClient.get(this.PATH_OF_API + '/entradaUsuario', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpClient.get(this.PATH_OF_API + '/entradaAdministrador', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles:any) :boolean {
    let isMatch = false;
    const userRoles: any = this.usuarioAuth.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].rolNombre === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return true;
  }
}
