import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngFor
import { FormsModule } from '@angular/forms'; // Importante para [(ngModel)]
import { ClienteService } from './services/cliente.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ClienteService]
})
export class AppComponent implements OnInit {
  title = 'LocalLink';

  // Lista de clientes
  clientes: any[] = [];

  // Objeto para el formulario
  clienteForm = {
    id: null,
    nombre: '',
    correo: '',
    telefono: ''
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe(
      (data: any) => {
        this.clientes = data;
      },
      (error) => console.error('Error al cargar clientes', error)
    );
  }

  guardarCliente() {
    if (this.clienteForm.id) {
      // Si tiene ID, es MODIFICAR
      this.clienteService.updateCliente(this.clienteForm.id, this.clienteForm).subscribe(() => {
        this.cargarClientes();
        this.limpiarFormulario();
      });
    } else {
      // Si no tiene ID, es REGISTRAR
      this.clienteService.createCliente(this.clienteForm).subscribe(() => {
        this.cargarClientes();
        this.limpiarFormulario();
      });
    }
  }

  editarCliente(cliente: any) {
    // Copiamos los datos al formulario
    this.clienteForm = { ...cliente };
  }

  limpiarFormulario() {
    this.clienteForm = { id: null, nombre: '', correo: '', telefono: '' };
  }
}
