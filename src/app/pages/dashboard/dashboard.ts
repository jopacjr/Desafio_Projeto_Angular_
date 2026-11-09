import { Component } from '@angular/core';
import { Menu } from '../../componentes/menu/menu';

@Component({
  selector: 'app-dashboard',
  imports: [Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
mensagemErro: any;
codigoVeiculo: any;
veiculos: any;
buscarDadosVeiculo() {
throw new Error('Method not implemented.');
}
veiculoSelecionado: any;
vin: any;
veiculoEscolhido($event: Event) {
throw new Error('Method not implemented.');
}

}
