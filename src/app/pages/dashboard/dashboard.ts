import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  vehicleImage: string = '';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onVehicleChange();
  }

  onVehicleChange(): void {
    this.updateVehicleImage();
    this.fetchDashboardData();
  }

  // Mapeia os arquivos exatos com a extensão .jpg conforme a estrutura enviada
  updateVehicleImage(): void {
    const imageMap: { [key: string]: string } = {
      'Ranger': 'ranger.jpg',
      'Mustang': 'mustang.jpg',
      'Territory': 'territory.jpg',
      'Bronco Sport': 'broncoSport.jpg'
    };

    const fileName = imageMap[this.selectedVehicle] || 'broncoSport.jpg';
    
    // Tenta primeiro carregar da pasta local de assets do Angular
    this.vehicleImage = `assets/${fileName}`;
  }

  // Caso o arquivo local não responda, tenta buscar as variações no back-end
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;

    if (this.selectedVehicle === 'Bronco Sport') {
      if (imgElement.src.includes('assets/broncoSport.jpg')) {
        imgElement.src = `${this.apiUrl}/broncoSport.jpg`;
      } else if (imgElement.src.includes('broncoSport.jpg')) {
        imgElement.src = `${this.apiUrl}/img/broncoSport.jpg`;
      } else if (!imgElement.src.includes('broncoSport.png')) {
        imgElement.src = `assets/broncoSport.png`;
      }
    } else {
      const fileName = this.selectedVehicle.toLowerCase();
      imgElement.src = `${this.apiUrl}/${fileName}.jpg`;
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

          // Se a API retornar a imagem explicitamente
          if (data.img) {
            this.vehicleImage = data.img.startsWith('http') 
              ? data.img 
              : `${this.apiUrl}/${data.img.replace(/^\/+/, '')}`;
          }
        }
      },
      error: () => {
        // Mantém o fallback de imagem definido em updateVehicleImage()
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