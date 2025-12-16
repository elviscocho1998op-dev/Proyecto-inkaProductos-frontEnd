import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InventarioComponent } from './components/inventario/inventario.component'; // <--- AGREGA ESTA LÍNEA

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];