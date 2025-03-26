import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UsuarioService } from './_services/usuario.service';
import { AddNuevoProductoComponent } from './add-nuevo-producto/add-nuevo-producto.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { MostrarDetalleProductoComponent } from './mostrar-detalle-producto/mostrar-detalle-producto.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MostrarImagenesProductoModalComponent } from './mostrar-imagenes-producto-modal/mostrar-imagenes-producto-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { VerDetalleProductoComponent } from './ver-detalle-producto/ver-detalle-producto.component';
import { ComprarProductoComponent } from './comprar-producto/comprar-producto.component';
import { ConfirmacionPedidoComponent } from './confirmacion-pedido/confirmacion-pedido.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { InformacionPedidoComponent } from './informacion-pedido/informacion-pedido.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UsuarioComponent,
    LoginComponent,
    EncabezadoComponent,
    ForbiddenComponent,
    AddNuevoProductoComponent,
    DragDirective,
    MostrarDetalleProductoComponent,
    MostrarImagenesProductoModalComponent,
    VerDetalleProductoComponent,
    ComprarProductoComponent,
    ConfirmacionPedidoComponent,
    RegistrarUsuarioComponent,
    CarritoCompraComponent,
    MisPedidosComponent,
    InformacionPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatMenuModule
  ],
  providers: [
    AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
