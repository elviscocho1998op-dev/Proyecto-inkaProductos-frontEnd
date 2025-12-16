export interface Producto {
    productoId?: number;
    sku: string;
    nombre: string;
    descripcion: string;  // Antes estaba como opcional o no existía
    precioLista: number;  // Debe ser exactamente así (camelCase)
    stock: number;        // Este campo recibirá el valor de la @Formula de Java
    activo: number;
  }