import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  aparecaMenu = false;

  aparecMenu(){

    this.aparecaMenu = !this.aparecaMenu;
  }

  constructor(private auth:Auth){}

  logout():void{
    this.auth.logout();
  }
}