import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CodigoVeiculo, VeiculosAPI } from '../models/veiculo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Automavel {

  private apiUrl = "http://localhost:3001"

  constructor(private http:HttpClient) {}

  getVeiculos(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicles`);
  }

  getCodigoVeiculo(vin: string): Observable<CodigoVeiculo> {
    return this.http.post<CodigoVeiculo>(`${this.apiUrl}/vehicleData`, { vin });
  }

}
