import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router'; // 1. Agregamos Router aquí
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common'; // 2. Agregamos CommonModule por si usas directivas


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule], // 3. Incluimos los módulos necesarios
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inka-frontend';

  // 4. Inyectamos el Router como 'public' para que el HTML pueda leer 'router.url'
  constructor(public router: Router) {}
}