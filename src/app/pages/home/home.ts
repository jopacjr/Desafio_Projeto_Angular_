import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { MenuComponent } from '../../componentes/menu/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  constructor(private authService: Auth) {}

  onLogout(): void {
    const logout = (this.authService as Auth & { logout?: () => void }).logout;
    logout?.();
  }
}