import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuComponent } from '../../componentes/menu/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MenuComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  private apiUrl = 'http://localhost:3001';

  vehicleOptions: string[] = ['Ranger', 'Mustang', 'Territory', 'Bronco Sport'];
  selectedVehicle: string = 'Mustang';
  vehicleImage: string = 'assets/mustang.jpg';

  totalVendas: number = 1500;
  conectados: number = 500;
  updateSoftware: number = 750;

  searchVin: string = '2FRHDUYS2Y63NHD22455';

  tableData = {
    odometro: '50000 Km',
    combustivel: '90 %',
    status: 'on',
    lat: '-12,2322',
    long: '-35,2314'
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onVehicleChange();
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }

  onVehicleChange(): void {
    // 1. Atualiza de imediato para a imagem local na pasta assets
    this.updateVehicleImage();
    // 2. Busca dados atualizados da API
    this.fetchDashboardData();
  }

  updateVehicleImage(): void {
    const imageMap: { [key: string]: string } = {
      'Ranger': 'assets/ranger.jpg',
      'Mustang': 'assets/mustang.jpg',
      'Territory': 'assets/territory.jpg',
      'Bronco Sport': 'assets/broncoSport.jpg'
    };

    this.vehicleImage = imageMap[this.selectedVehicle] || 'assets/mustang.jpg';
  }

  // Tratamento de erro caso a imagem local não seja encontrada em assets/
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    
    // Tenta carregar usando arquivos estáticos do servidor Node
    const nameMap: { [key: string]: string } = {
      'Ranger': 'ranger',
      'Mustang': 'mustang',
      'Territory': 'territory',
      'Bronco Sport': 'broncoSport'
    };
    
    const fileName = nameMap[this.selectedVehicle];
    if (!imgElement.src.includes(this.apiUrl)) {
      imgElement.src = `${this.apiUrl}/img/${fileName}.png`;
    }
  }

  fetchDashboardData(): void {
    this.http.get<any>(`${this.apiUrl}/vehicle?model=${this.selectedVehicle}`).subscribe({
      next: (response) => {
        const data = Array.isArray(response) ? response[0] : response;

        if (data) {
          if (data.totalVendas) this.totalVendas = data.totalVendas;
          if (data.conectados) this.conectados = data.conectados;
          if (data.updateSoftware) this.updateSoftware = data.updateSoftware;

          // Se a API retornar o campo de imagem válido, atualiza o caminho
          const apiImg = data.imagem || data.img;
          if (apiImg) {
            this.vehicleImage = apiImg.startsWith('http') 
              ? apiImg 
              : `${this.apiUrl}/${apiImg.replace(/^\/+/, '')}`;
          }
        }
      },
      error: () => {
        // Mantém a imagem definida por updateVehicleImage()
      }
    });
  }

  onVinSearch(): void {
    if (this.searchVin.length > 5) {
      this.http.get<any>(`${this.apiUrl}/vehicleData?vin=${this.searchVin}`).subscribe({
        next: (response) => {
          const data = Array.isArray(response) ? response[0] : response;
          if (data) {
            this.tableData = {
              odometro: data.odometro || this.tableData.odometro,
              combustivel: data.combustivel || this.tableData.combustivel,
              status: data.status || this.tableData.status,
              lat: data.lat || this.tableData.lat,
              long: data.long || this.tableData.long
            };
          }
        }
      });
    }
  }
}