import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// IMPORTANTE: Asegúrate de que diga 'export class AuthService'
export class AuthService { 
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    // Este objeto {email, password} debe coincidir con tu DTO en Java
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  setSession(usuario: any) {
    // Guardamos el objeto completo (incluyendo el nombre que manda Java)
    localStorage.setItem('user_data', JSON.stringify(usuario));
  }
}