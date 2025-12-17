import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private emailKey = 'auth_email';
  private passKey  = 'auth_pass';

  login(email: string, password: string) {
    localStorage.setItem(this.emailKey, email);
    localStorage.setItem(this.passKey, password);
  }

  logout() {
    localStorage.removeItem(this.emailKey);
    localStorage.removeItem(this.passKey);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthHeader();
  }

  getAuthHeader(): string | null {
    const email = localStorage.getItem(this.emailKey);
    const pass  = localStorage.getItem(this.passKey);
    if (!email || !pass) return null;
    return 'Basic ' + btoa(`${email}:${pass}`);
  }

  getEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }
  
  // Opcional: para mostrar/ocultar botones por “rol” sin pedirle al backend
  // (ojo: esto es SOLO UI, la seguridad real la impone el backend)
  getRoleHint(): 'ADMIN' | 'USER' | 'TI' | null {
    const email = localStorage.getItem(this.emailKey);
    if (!email) return null;
    if (email === 'admin@inkaproductos.com') return 'ADMIN';
    if (email === 'user@inkaproductos.com') return 'USER';
    if (email === 'gestionti@inkaproductos.com') return 'TI';
    return null;
  }
}
