import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  message:any;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    this.usuarioService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
