import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { MenuComponent } from '../../componentes/menu/menu';

@Component({
  selector: 'app-home',
  imports: [MenuComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
onLogout() {
throw new Error('Method not implemented.');
}

  constructor(private auth: Auth) {}
  logout():void{
    this.auth.logout();
  }

}