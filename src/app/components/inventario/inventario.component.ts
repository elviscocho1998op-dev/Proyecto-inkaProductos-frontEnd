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
  esTI: boolean = false;
  
  // Guardamos qué seleccionó el usuario para enviarlo al servicio
  catSeleccionada: number = 0;
  almSeleccionado: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.verificarRol();
  }

  verificarRol() {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      this.esTI = user.roles && user.roles.includes('TI'); 
    }
  }

  cargarProductos() {
    this.apiService.getProductos().subscribe({
      next: (data) => this.listaProductos = data,
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  // Esta función se activa cuando mueves los filtros en el HTML
  aplicarFiltro(event: any, tipo: string) {
    const valor = Number(event.target.value);
    if (tipo === 'categoria') {
      this.catSeleccionada = valor;
    } else {
      this.almSeleccionado = valor;
    }

    this.apiService.filtrarProductos(this.catSeleccionada, this.almSeleccionado).subscribe({
      next: (data) => this.listaProductos = data,
      error: (err) => console.error('Error al filtrar:', err)
    });
  }

  eliminar(id?: number) {
    if (id && confirm('¿Estás seguro de eliminar este producto?')) {
      this.apiService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}