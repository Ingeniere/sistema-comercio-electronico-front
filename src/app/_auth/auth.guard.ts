import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../_services/usuario.service';
import { UsuarioAuthService } from '../_services/usuario-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService,
    private router:Router,
    private usuarioAuth:UsuarioAuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.usuarioAuth.getToken() !== null) {
        const role = route.data['roles'] as Array<string>;//aqui nose aun porque debe ir debe ir "roles"

        if (role) {
          const match = this.usuarioService.roleMatch(role);

          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
      }

      this.router.navigate(['/login']);
      return false;
    }
  }

