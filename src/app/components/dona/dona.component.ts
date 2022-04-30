import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  
  @Input() tittle:string = 'Sin Titulo';
  
  @Input( 'labels' ) doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];
  @Input('data') dataSet:number[]=[ 5,5,5 ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.dataSet },
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';
  ngOnInit(): void {
    this.doughnutChartData = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.dataSet },
    ]
  };
  }
  
}
