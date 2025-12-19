import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historial: any[] = [];
  rol: string = '';
  email: string = '';

  constructor(
    private auth: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    const usuario = this.auth.obtenerUsuario();
    if (!usuario) return;

    this.rol = usuario.rol ?? '';
    this.email = usuario.email ?? '';

    // 🔍 Normalizar el rol (porque Spring suele devolver ROLE_ADMIN, ROLE_USER)
    const r = this.rol.toUpperCase();

    const esAdmin = r.includes('ADMIN');   // ATRAPA ADMIN y ROLE_ADMIN
    const esUser  = r.includes('USER');    // ATRAPA USER y ROLE_USER

    // ===============================
    // ADMIN → historial general REAL
    // ===============================
    if (esAdmin) {
      this.productService.getHistorialGeneral()
        .subscribe({
          next: (res: any[]) => {
            this.historial = res.map(m => ({ ...m, expanded: false }));
          },
          error: (err) => {
            console.error("Error historial general:", err);
          }
        });
      return;
    }

    // ==================================
    // USER → listar solicitudes propias
    // ==================================
    if (esUser) {
      this.productService.getMisSolicitudes(this.email)
        .subscribe({
          next: (res: any[]) => {
            this.historial = res.map(s => ({ ...s, expanded: false }));
          },
          error: (err) => {
            console.error("Error solicitudes:", err);
          }
        });
      return;
    }

    // ====================================================
    // TI o cualquier otro → Por ahora no muestra historial
    // ====================================================
    console.warn("Rol no soportado aún:", this.rol);
  }

  toggle(item: any) {
    item.expanded = !item.expanded;
  }

}
