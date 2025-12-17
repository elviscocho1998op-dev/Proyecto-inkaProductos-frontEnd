import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // ajusta ruta si difiere

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  rolLabel: string = 'Invitado';
  emailLabel: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    const email = this.auth.getEmail?.() ?? localStorage.getItem('auth_email'); // por si aún no agregas getEmail()
    this.emailLabel = email ?? '';

    // Solo para mostrar (UI). La seguridad real está en Spring.
    const hint = this.auth.getRoleHint?.() ?? null;
    this.rolLabel = hint ?? (this.emailLabel ? 'Usuario' : 'Invitado');
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
