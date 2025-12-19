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

    this.rol = usuario.rol;
    this.email = usuario.email;

    // ADMIN → historial de movimientos reales
    if (this.rol === 'ADMIN') {

      this.productService.getHistorialGeneral()
        .subscribe((res: any[]) => {
          this.historial = res.map(m => ({ ...m, expanded: false }));
        });

    // USER → solicitudes enviadas
    } else {

      this.productService.getMisSolicitudes(this.email)
        .subscribe((res: any[]) => {
          this.historial = res.map(s => ({ ...s, expanded: false }));
        });

    }
  }

  toggle(item: any) {
    item.expanded = !item.expanded;
  }

}
