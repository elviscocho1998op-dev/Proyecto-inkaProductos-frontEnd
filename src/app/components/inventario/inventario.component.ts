import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Producto } from '../../models/producto.models';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  listaProductos: Producto[] = [];
  
  // 1. Variable para controlar quién puede ver los botones
  esTI: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarProductos();
    // 2. Ejecutamos la validación al cargar el componente
    this.verificarRol();
  }

  // 3. Lógica para leer el rol del localStorage
  verificarRol() {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      // Revisamos si el usuario tiene el rol de TI
      // Importante: Verifica si en tu consola sale 'TI' o 'ROLE_TI' según tu Java
      this.esTI = user.roles && user.roles.includes('TI'); 
      console.log('¿Es usuario de TI?:', this.esTI);
    }
  }

  cargarProductos() {
    this.apiService.getProductos().subscribe({
      next: (data) => {
        this.listaProductos = data;
        console.log('Productos cargados:', data);
      },
      error: (err) => {
        console.error('Error al conectar con Spring Boot:', err);
      }
    });
  }

  // 4. Función para el botón Eliminar (la usaremos pronto)
  eliminar(id?: number) {
    if (id && confirm('¿Estás seguro de eliminar este producto?')) {
      console.log('Eliminando producto:', id);
      // Aquí llamaremos al servicio más adelante
    }
  }
}