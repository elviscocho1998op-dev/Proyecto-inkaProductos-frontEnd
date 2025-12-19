import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  categorias: any[] = [];
  almacenes: any[] = [];
  productos: any[] = [];

  categoriaId: number | null = null;
  almacenId: number | null = null;

  constructor(private invService: InventarioService) {}

  ngOnInit(): void {
    this.invService.getCategorias().subscribe(r => this.categorias = r);
    this.invService.getAlmacenes().subscribe(r => this.almacenes = r);
    this.cargarTodos();
  }

  cargarTodos() {
    this.invService.filtrarProductos().subscribe(r => this.productos = r);
  }

  filtrar() {
    this.invService.filtrarProductos(this.categoriaId!, this.almacenId!)
      .subscribe(r => this.productos = r);
  }
}
