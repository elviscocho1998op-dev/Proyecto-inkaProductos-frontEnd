import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8081/api/productos';

  constructor(private http: HttpClient) { }


  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  filtrarProductos(categoriaId?: number, almacenId?: number): Observable<Producto[]> {
    let params = new HttpParams();
    if (categoriaId && categoriaId > 0) params = params.set('categoriaId', categoriaId.toString());
    if (almacenId && almacenId > 0) params = params.set('almacenId', almacenId.toString());

    return this.http.get<Producto[]>(`${this.apiUrl}/filtrar`, { params });
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}