import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));//aqui estamos sacando el role que
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') ||"[]");//aqui se esta leyendo el roles al empezar a ejecutar el proyecto
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')!;
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].rolNombre === 'Admin';
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].rolNombre === 'Usuario';
  }
}
