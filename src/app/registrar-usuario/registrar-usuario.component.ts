import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  registrarUsuarioFor(registrarForm: NgForm) {
    console.log(registrarForm.value);
    this.usuarioService.registrarUsuario(registrarForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
