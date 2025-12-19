import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ComprasComponent } from './components/compras/compras.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AprobacionesComponent } from './components/aprobaciones/aprobaciones.component';

export const routes: Routes = [

  // Redirección base
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login
  { path: 'login', component: LoginComponent },

  // Página inicio
  { path: 'inicio', component: InicioComponent },

  // Inventario
  { path: 'inventario', component: InventarioComponent },

  // Compras
  { path: 'compras', component: ComprasComponent },

  // Historial
  { path: 'historial', component: HistorialComponent },

  // Aprobaciones
  { path: 'aprobaciones', component: AprobacionesComponent },

  // Página por defecto si ruta no existe
  { path: '**', redirectTo: 'inicio' }
];
