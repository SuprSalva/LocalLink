import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from './services/producto.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService]
})
export class ProductosComponent implements OnInit {
  // Lista de productos
  productos: Producto[] = [];

  // Objeto para el formulario
  productoForm: Producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    stock: 0,
    activo: true
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => console.error('Error al cargar productos', error)
    );
  }

  guardarProducto() {
    if (this.productoForm.id) {
      // Si tiene ID, es MODIFICAR
      this.productoService.updateProducto(this.productoForm.id, this.productoForm).subscribe(() => {
        this.cargarProductos();
        this.limpiarFormulario();
      });
    } else {
      // Si no tiene ID, es REGISTRAR
      this.productoService.createProducto(this.productoForm).subscribe(() => {
        this.cargarProductos();
        this.limpiarFormulario();
      });
    }
  }

  editarProducto(producto: Producto) {
    // Copiamos los datos al formulario
    this.productoForm = { ...producto };
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }

  limpiarFormulario() {
    this.productoForm = {
      id: undefined,
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      stock: 0,
      activo: true
    };
  }

  // Método para formatear precio manualmente
  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}