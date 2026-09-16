import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {
logout() {
throw new Error('Method not implemented.');
}
  // Inicia fechado por padrão
  menuAberto: boolean = false;

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }
}