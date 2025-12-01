package com.locallink.controller;

import com.locallink.model.Cliente;
import com.locallink.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    // Consultar todos (Para la "Vista de lista simple" de HU01) 
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    // Registrar (Para el "Formulario" de HU01) 
    @PostMapping
    public Cliente guardarCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Modificar (Requerido en HU01) 
    @PutMapping("/{id}")
    public Cliente actualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteDetalles) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow();
        cliente.setNombre(clienteDetalles.getNombre());
        cliente.setCorreo(clienteDetalles.getCorreo());
        cliente.setTelefono(clienteDetalles.getTelefono());
        return clienteRepository.save(cliente);
    }
}