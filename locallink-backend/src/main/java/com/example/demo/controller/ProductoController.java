package com.example.demo.controller;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // GET: Obtener todos los productos
    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // GET: Obtener producto por ID
    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    // POST: Crear nuevo producto
    @PostMapping
    public Producto crearProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // PUT: Actualizar producto existente
    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody Producto productoDetalles) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setNombre(productoDetalles.getNombre());
        producto.setDescripcion(productoDetalles.getDescripcion());
        producto.setPrecio(productoDetalles.getPrecio());
        producto.setCategoria(productoDetalles.getCategoria());
        producto.setStock(productoDetalles.getStock());
        producto.setActivo(productoDetalles.getActivo());

        return productoRepository.save(producto);
    }

    // DELETE: Eliminar producto (lógico)
    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        producto.setActivo(false);
        productoRepository.save(producto);
        
        // Eliminación física
        // productoRepository.deleteById(id);
    }
}