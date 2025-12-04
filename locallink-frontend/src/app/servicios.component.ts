import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService, Servicio } from './services/servicio.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers: [ServicioService]
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  servicioForm: Servicio = {
    nombre: '',
    descripcion: '',
    precio: 0,
    activo: true
  };

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.getServicios().subscribe(
      (data: Servicio[]) => {
        this.servicios = data;
      },
      (error) => console.error('Error al cargar servicios', error)
    );
  }

  guardarServicio() {
    if (this.servicioForm.id) {
      this.servicioService.actualizarServicio(this.servicioForm.id, this.servicioForm).subscribe(() => {
        this.cargarServicios();
        this.limpiarFormulario();
      });
    } else {
      this.servicioService.crearServicio(this.servicioForm).subscribe(() => {
        this.cargarServicios();
        this.limpiarFormulario();
      });
    }
  }

  editarServicio(servicio: Servicio) {
    this.servicioForm = { ...servicio };
  }

  // NUEVO: Método para cambiar estado
  cambiarEstadoServicio(servicio: Servicio) {
    const nuevoEstado = !servicio.activo;
    const accion = nuevoEstado ? 'activar' : 'desactivar';
    
    if (confirm(`¿Estás seguro de ${accion} el servicio "${servicio.nombre}"?`)) {
      this.servicioService.cambiarEstadoServicio(servicio.id!, nuevoEstado).subscribe(
        () => {
          // Actualizamos localmente para mejor UX
          servicio.activo = nuevoEstado;
          // También recargamos desde el servidor por si acaso
          this.cargarServicios();
        },
        (error) => {
          console.error(`Error al ${accion} servicio:`, error);
          alert(`Error al ${accion} el servicio`);
        }
      );
    }
  }

  // Método antiguo de eliminar (ahora llama a cambiarEstado)
  eliminarServicio(id: number) {
    // Buscamos el servicio por ID
    const servicio = this.servicios.find(s => s.id === id);
    if (servicio) {
      this.cambiarEstadoServicio(servicio);
    }
  }

  limpiarFormulario() {
    this.servicioForm = {
      id: undefined,
      nombre: '',
      descripcion: '',
      precio: 0,
      activo: true
    };
  }

  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}