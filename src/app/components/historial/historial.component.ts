import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  
  // Lista que almacena el historial de movimientos
  listaHistorial: any[] = []; 


  detalleSeleccionado: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.apiService.getHistorial().subscribe({
      next: (data) => {
        this.listaHistorial = data.sort((a: any, b: any) => 
          new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime()
        );
      },
      error: (err) => {
        console.error('Error al cargar historial:', err);
      }
    });
  }

  toggleDetalle(id: number): void {
    this.detalleSeleccionado = this.detalleSeleccionado === id ? null : id;
  }

  obtenerClaseEstado(estado: string): string {
    switch (estado) {
      case 'APROBADA': return 'badge bg-success';
      case 'PENDIENTE': return 'badge bg-warning text-dark';
      case 'RECHAZADA': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
}