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

  // ... (mismos imports de antes)

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (usuario) => {
        console.log('Bienvenido:', usuario.nombre);
        this.authService.setSession(usuario); // Guardamos el objeto que mandó Java
        this.router.navigate(['/inicio']); 
      },
      error: (err) => {
        console.error(err);
        alert('Error: Correo o contraseña incorrectos');
      }
    });
  }
}