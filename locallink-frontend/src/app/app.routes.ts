import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ServiciosComponent } from './servicios.component'; 

export const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'servicios', component: ServiciosComponent },  
  { path: '**', redirectTo: '/clientes' }
];