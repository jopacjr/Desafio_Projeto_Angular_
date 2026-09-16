import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
onVehicleChange() {
throw new Error('Method not implemented.');
}
selectedVehicle: any;

}
