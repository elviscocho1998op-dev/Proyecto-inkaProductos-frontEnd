import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8081/api/productos';
  private authUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  // 1. Método de Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials);
  }

  // 2. Generador de Headers (Para evitar repetir código)
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin@inkaproductos.com:admin123')
    });
  }

  // 3. Obtener productos
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // 4. FILTRAR PRODUCTOS (Este es el que faltaba)
  filtrarProductos(categoriaId?: number, almacenId?: number): Observable<Producto[]> {
    let params = new HttpParams();
    if (categoriaId && categoriaId > 0) params = params.set('categoriaId', categoriaId.toString());
    if (almacenId && almacenId > 0) params = params.set('almacenId', almacenId.toString());

    return this.http.get<Producto[]>(`${this.apiUrl}/filtrar`, { params });
  }

  // 5. Eliminar
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // 6. Guardar
  guardarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto, { headers: this.getAuthHeaders() });
  }

  // 7. Realizar Compra
  realizarCompra(datos: any): Observable<any> {
    const payload = { 
      ...datos, 
      usuarioEmail: 'admin@inkaproductos.com', 
      esAdmin: true 
    };
    return this.http.post(`${this.apiUrl}/transaccion`, payload, { headers: this.getAuthHeaders() });
  }

  // 8. Historial
  getHistorial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transaccion/historial`, { headers: this.getAuthHeaders() });
  }
}