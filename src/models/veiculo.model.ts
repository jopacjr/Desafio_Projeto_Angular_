export interface Veiculos extends Array<Veiculo> {
  vehicles: Veiculo[];
}

export interface Veiculo {
img: any;
  id: number | string
  vehicle: string
  volumetotal: number | string
  connected: number | string
  softwareUpdates: number | string
}

export interface VeiculosAPI {
  vehicles: Veiculos;
}