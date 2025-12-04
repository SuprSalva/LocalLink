import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ProductosComponent } from './productos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '**', redirectTo: '/clientes' }
];