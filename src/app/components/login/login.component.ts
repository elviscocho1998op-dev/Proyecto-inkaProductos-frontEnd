import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('Por favor, ingrese sus credenciales');
      return;
    }

    // Opción A: no llamamos al backend aquí.
    // Guardamos credenciales para que el interceptor mande Basic Auth en cada request.
    this.authService.login(this.email.trim(), this.password);

    // Redirigimos al inicio
    this.router.navigate(['/inicio']);
  }
}
