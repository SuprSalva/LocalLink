import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio { 
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  fechaCreacion?: string;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'http://localhost:8080/api/servicios';

  constructor(private http: HttpClient) { }

  // Obtener todos los servicios
  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  // Obtener servicio por ID
  getServicio(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo servicio
  crearServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, servicio);
  }

  // Actualizar servicio
  actualizarServicio(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${id}`, servicio);
  }

  // NUEVO: Cambiar estado (activar/desactivar)
  cambiarEstadoServicio(id: number, activo: boolean): Observable<Servicio> {
    // Primero obtenemos el servicio
    return new Observable(observer => {
      this.getServicio(id).subscribe(servicio => {
        // Actualizamos el estado
        servicio.activo = activo;
        // Guardamos los cambios
        this.actualizarServicio(id, servicio).subscribe(
          updated => {
            observer.next(updated);
            observer.complete();
          },
          error => observer.error(error)
        );
      }, error => observer.error(error));
    });
  }

  // Eliminar servicio (desactivar)
  eliminarServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}