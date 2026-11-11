import { Component, OnInit } from '@angular/core';
import { Menu } from '../../componentes/menu/menu';
import { Veiculo, CodigoVeiculo } from '../../models/veiculo.model';
import { Automavel } from '../../services/automavel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  imports: [Menu, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  veiculos: Veiculo[] = [];
  veiculoSelecionado: Veiculo | null = null;

  vin = '';
  codigoVeiculo: CodigoVeiculo | null = null;
  mensagemErro = '';

  constructor(private vehicle:Automavel) {}

  ngOnInit(): void {
    this.vehicle.getVeiculos().subscribe(
      response => {
        this.veiculos = response.vehicles;
      }
    )
  }

  buscarDadosVeiculo(): void {
    this.mensagemErro = '';
    this.codigoVeiculo = null;

    if (!this.vin.trim()) {
      this.mensagemErro = 'Não Encontrado';
      return;
    }

    this.vehicle.getCodigoVeiculo(this.vin.trim()).subscribe({
      next: response => {
        this.codigoVeiculo = response;
      },
      error: error => {
        this.mensagemErro =
          error.error?.message || 'Não foi possível buscar os dados do veículo.';
      }
    });
  }
  
  veiculoEscolhido(event: Event): void{
    const idSelecionado = (event.target as HTMLSelectElement).value;
    if(idSelecionado) {
      this.veiculoSelecionado = this.veiculos.find( v=>v.id == Number(idSelecionado)) || null;
    }
  }



}
