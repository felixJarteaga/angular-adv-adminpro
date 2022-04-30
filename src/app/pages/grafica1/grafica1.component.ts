import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labelsVentas:string[]= [ 'Pan', 'Refrescos', 'Tacos' ];
  public labelsCompras: string[]=['Fanta Limón', 'Larios','Hielos']
  public dataSetVentas:number[] = [10,15,40];
  public dataSetCompras:number[] = [ 30,80,20];
  // public data1: ChartData<'doughnut'> = {
  //   labels: this.labels1,
  //   datasets: [
  //     { data: [ 350, 450, 100 ] },
  //   ]
  // };


  
}
