export interface ItemCarrito {
    productoId: number;
    sku: string;        // Visual
    nombre: string;     // Visual
    cantidadSeleccionada: number;
  }
  
  export interface TransaccionRequest {
    origenId: number;
    destinoId: number;
    usuarioEmail: string;
    esAdmin: boolean;
    items: { productoId: number; cantidad: number }[];
  }