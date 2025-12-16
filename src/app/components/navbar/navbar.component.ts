import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  usuarioNombre: string = 'Invitado';

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('user_data');
    if (data) {
      const usuario = JSON.parse(data);
      // Ajuste: Usamos 'username' porque así lo devuelve Spring Security In-Memory
      this.usuarioNombre = usuario.username || usuario.nombre || 'Usuario';
    }
  }

  onLogout() {
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }
}