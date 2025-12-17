import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Producto } from '../../models/producto.models';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent implements OnInit {
  listaProductos: Producto[] = [];
  carrito: Producto[] = []; 
  
  // Almacenes por defecto
  almacenOrigen: number = 1;
  almacenDestino: number = 2;
  
  // Filtros
  catSeleccionada: number = 0;
  almSeleccionado: number = 0;

  // --- SIMULACIÓN DE USUARIO LOGUEADO ---
  // Cambia este valor manualmente para probar los 3 perfiles el domingo:
  // 1. 'admin@inkaproductos.com'
  // 2. 'user@inkaproductos.com'
  // 3. 'gestionti@inkaproductos.com'
  usuarioActual: string = 'admin@inkaproductos.com'; 

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.apiService.getProductos().subscribe({
      next: (data) => this.listaProductos = data,
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  agregarAlCarrito(producto: Producto, cantidad: string | number): void {
    const cantNumerica = Number(cantidad);
    if (cantNumerica <= 0) return;

    const stockDisponible = producto.stock ?? 0;
    if (cantNumerica > stockDisponible) {
      alert(`⚠️ Stock insuficiente en el origen. Disponible: ${stockDisponible}`);
      return;
    }

    const itemExistente = this.carrito.find(item => item.productoId === producto.productoId);

    if (itemExistente) {
      const nuevaCantidad = (itemExistente.cantidadSeleccionada ?? 0) + cantNumerica;
      if (nuevaCantidad > stockDisponible) {
        alert(`⚠️ No puedes agregar más. El total en carrito excedería el stock disponible.`);
        return;
      }
      itemExistente.cantidadSeleccionada = nuevaCantidad;
    } else {
      this.carrito.push({
        ...producto,
        cantidadSeleccionada: cantNumerica
      });
    }
  }

  aplicarFiltro(event: any, tipo: string) {
    const valor = Number(event.target.value);
    if (tipo === 'categoria') {
      this.catSeleccionada = valor;
    } else {
      this.almSeleccionado = valor;
    }
  
    // Se añade ': any' a data y err para quitar los errores de TypeScript
    this.apiService.filtrarProductos(this.catSeleccionada, this.almSeleccionado).subscribe({
      next: (data: any) => {
        this.listaProductos = data;
      },
      error: (err: any) => {
        console.error('Error al filtrar:', err);
      }
    });
  }

  confirmarTransaccion(): void {
    const origenId = Number(this.almacenOrigen);
    const destinoId = Number(this.almacenDestino);
  
    if (origenId === destinoId) {
      alert("❌ Error: El almacén de origen y destino no pueden ser iguales.");
      return;
    }
  
    if (this.carrito.length === 0) {
      alert("🛒 El carrito está vacío.");
      return;
    }
  
    // --- LÓGICA DINÁMICA DE USUARIO ---
    // Determinamos si es Admin basándonos en el correo actual
    const esAdmin = this.usuarioActual === 'admin@inkaproductos.com';

    const datosCompra = {
      origenId: origenId,
      destinoId: destinoId,
      usuarioEmail: this.usuarioActual, // Dinámico
      esAdmin: esAdmin,                 // Dinámico: true para admin, false para los demás
      items: this.carrito.map(item => ({
          productoId: item.productoId,
          cantidad: item.cantidadSeleccionada
      }))
    };
  
    console.log('Enviando a Java:', datosCompra);
  
    this.apiService.realizarCompra(datosCompra).subscribe({
      next: (res) => {
        // Personalizamos el mensaje según el perfil
        if (esAdmin) {
          alert('✅ ¡Transacción Exitosa! (Stock actualizado inmediatamente)');
        } else {
          alert('⏳ Solicitud enviada con éxito. (Pendiente de aprobación por el Admin)');
        }
        
        this.vaciarCarrito();
        this.obtenerProductos(); 
      },
      error: (err) => {
        console.error('Error del servidor:', err);
        alert('❌ No se pudo completar la operación. Verifique la conexión con el servidor Java.');
      }
    });
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }
}