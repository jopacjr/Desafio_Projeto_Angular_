import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
autoLogin: any;
password: any;
username: any;
onSubmit() {
throw new Error('Method not implemented.');
}
usuario ={
  nome: '',
  senha: '',
};
 mensagemDeErro: string | null = null;
 constructor(private auth: Auth, private router: Router) {}
 login() { this.auth.login(this.usuario).subscribe
  ({
    next:(response) =>{ this.router.navigate(['/home']);},
    error:(err) =>{this.mensagemDeErro = err.error.message || 'Usuário ou senha inválidos';},
  }
) 


 }

}
