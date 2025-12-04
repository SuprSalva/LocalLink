package com.example.demo.controller;

import com.example.demo.model.Servicio;
import com.example.demo.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios") 
@CrossOrigin(origins = "http://localhost:4200")
public class ServicioController { 

    @Autowired
    private ServicioRepository servicioRepository;

    // GET: Obtener todos los servicios
    @GetMapping
    public List<Servicio> listarServicios() {
        return servicioRepository.findAll();
    }

    // GET: Obtener servicio por ID
    @GetMapping("/{id}")
    public Servicio obtenerServicio(@PathVariable Long id) {
        return servicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
    }

    // POST: Crear nuevo servicio
    @PostMapping
    public Servicio crearServicio(@RequestBody Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    // PUT: Actualizar servicio existente
    @PutMapping("/{id}")
    public Servicio actualizarServicio(@PathVariable Long id, @RequestBody Servicio servicioDetalles) {
        Servicio servicio = servicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));

        servicio.setNombre(servicioDetalles.getNombre());
        servicio.setDescripcion(servicioDetalles.getDescripcion());
        servicio.setPrecio(servicioDetalles.getPrecio());
        servicio.setActivo(servicioDetalles.getActivo());

        return servicioRepository.save(servicio);
    }

    // DELETE: Eliminar servicio (lógico)
    @DeleteMapping("/{id}")
    public void eliminarServicio(@PathVariable Long id) {
        Servicio servicio = servicioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
        servicio.setActivo(false);
        servicioRepository.save(servicio);
    }
}