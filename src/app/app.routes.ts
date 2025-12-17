import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { GestionProductoComponent } from './components/gestion-producto/gestion-producto.component';
import { ComprasComponent } from './components/compras/compras.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AprobacionesComponent } from './components/aprobaciones/aprobaciones.component';
import { RolesComponent } from './components/roles/roles.component';

/**
 * Configuración de rutas de Inka Productos.
 * El orden es vital: rutas específicas -> redirecciones -> comodines.
 */
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'inventario', component: InventarioComponent },
  
  // Gestión de productos (Alta y Edición)
  { path: 'gestion-producto', component: GestionProductoComponent },
  { path: 'gestion-producto/:id', component: GestionProductoComponent },

  // Módulos de Operaciones
  { path: 'compras', component: ComprasComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'aprobaciones', component: AprobacionesComponent },

  // Módulo de Configuración de Usuarios
  { path: 'gestion-roles', component: RolesComponent },

  // Redirecciones y Seguridad
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];