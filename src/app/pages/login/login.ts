import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  usuario = {
    nome: '',
    senha: ''
  }

  mensagemErro: string | null = null;

  constructor(private auth: Auth, private router: Router) {}

  login() {
    this.auth.login(this.usuario).subscribe
    ({
      next:(response) => {
        this.router.navigate(['/home']);
      },
      error:(err) => {
        this.mensagemErro = err.error.message || "Usuario ou senha inválidos";
      }


    })
  }
}
