import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNuevoProductoComponent } from './add-nuevo-producto/add-nuevo-producto.component';
import { MostrarDetalleProductoComponent } from './mostrar-detalle-producto/mostrar-detalle-producto.component';
import { ProductoResolveService } from './ProductoResolveService';
import { VerDetalleProductoComponent } from './ver-detalle-producto/ver-detalle-producto.component';
import { ComprarProductoComponent } from './comprar-producto/comprar-producto.component';
import { ComprarProductoResolverService } from './comprar-producto-resolver.service';
import { ConfirmacionPedidoComponent } from './confirmacion-pedido/confirmacion-pedido.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { InformacionPedidoComponent } from './informacion-pedido/informacion-pedido.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "usuario",
    component: UsuarioComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Usuario"] },
  },
  { path: "login", component: LoginComponent },
  { path: "forbidden", component: ForbiddenComponent },

  {
    path: "AddNuevoProducto",
    component: AddNuevoProductoComponent,
    canActivate: [AuthGuard],
    data: { roles: [ 'Admin'] },
    resolve: {
      producto:ProductoResolveService
    },
  },
  {
    path: "mostrarProductoDetalles",
    component: MostrarDetalleProductoComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "verDatalleDeProducto",
    component: VerDetalleProductoComponent,
    resolve: { producto: ProductoResolveService },
  },

  {
    path: "comprarProducto",
    component: ComprarProductoComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Usuario"] },
    resolve: {
      productoDetalles: ComprarProductoResolverService,
    },
  },
  {
    path:"confirmacionPedido",
    component: ConfirmacionPedidoComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Usuario"] }
  },
  {
    path: "registrarUsuario",
    component: RegistrarUsuarioComponent
  },
  {
    path: "carrito",
    component: CarritoCompraComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Usuario"] }
  },
  {
    path:"miPedido",
    component: MisPedidosComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Usuario"] }
  },
  {
    path: "informacionPedido",
    component: InformacionPedidoComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
