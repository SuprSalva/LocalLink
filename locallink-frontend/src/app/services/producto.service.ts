import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria?: string;
  stock?: number;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // URL
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Crear nuevo producto
  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // Actualizar producto
  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // Eliminar producto (eliminación lógica)
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}