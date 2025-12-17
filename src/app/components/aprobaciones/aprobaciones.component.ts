import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-aprobaciones',
  standalone: true,
  // IMPORTANTE: CommonModule es necesario para usar @for, @if y pipes en el HTML
  imports: [CommonModule], 
  templateUrl: './aprobaciones.component.html',
  styleUrl: './aprobaciones.component.css'
})
export class AprobacionesComponent implements OnInit {
  
  // Lista de solicitudes que esperan revisión
  solicitudesPendientes: any[] = [];
  detalleSeleccionado: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  /**
   * Obtiene las solicitudes desde el backend.
   * Filtramos para mostrar solo las que están en estado 'PENDIENTE'.
   */
  cargarPendientes(): void {
    this.apiService.getHistorial().subscribe({
      next: (data) => {
        // Usamos el filtro para mostrar solo lo que el admin debe aprobar
        this.solicitudesPendientes = data.filter((s: any) => s.estado === 'PENDIENTE');
      },
      error: (err) => {
        console.error('Error al cargar aprobaciones:', err);
      }
    });
  }

  /**
   * Cambia el estado de una solicitud. 
   * @param id ID de la solicitud
   * @param nuevoEstado 'APROBADA' o 'RECHAZADA'
   */
  procesarSolicitud(id: number, nuevoEstado: string): void {
    // Aquí llamarías a un método de tu apiService para actualizar el estado en Java
    console.log(`Solicitud ${id} cambiada a ${nuevoEstado}`);
    
    // Simulación: actualizamos la lista local para que desaparezca de la bandeja
    this.solicitudesPendientes = this.solicitudesPendientes.filter(s => s.solicitudId !== id);
    alert(`La solicitud ha sido ${nuevoEstado} con éxito.`);
  }

  toggleDetalle(id: number): void {
    this.detalleSeleccionado = this.detalleSeleccionado === id ? null : id;
  }
}