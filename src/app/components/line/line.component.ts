import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-line',
  template: `
    <ngx-charts-line-chart
      *ngIf="lineChartData && lineChartData.length > 0"
      [view]="[700, 400]"
      [results]="lineChartResults"
      [xAxis]="xAxis"
      [yAxis]="yAxis"
      [showXAxisLabel]="showXAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-line-chart>
  `,
  styleUrls: ['./line.component.scss'],
  standalone: false
})
export class LineComponent implements OnChanges {
  @Input() data: any[] = [];
  public lineChartData: any[] = [];


  xAxis = true;
  yAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Année';
  showYAxisLabel = true;
  yAxisLabel = 'Nombre de Médailles';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      console.log('Données reçues pour le graphique:', changes['data'].currentValue);
      this.lineChartData = this.transformData(changes['data'].currentValue);
    }
  }

  private transformData(data: any[]): any[] {
    const yearMedalMap = new Map<number, number>();

    data.forEach(participation => {
      const year = participation.year;
      const medalsCount = participation.medalsCount;

      if (yearMedalMap.has(year)) {
        yearMedalMap.set(year, yearMedalMap.get(year) + medalsCount);
      } else {
        yearMedalMap.set(year, medalsCount);
      }
    });

    return Array.from(yearMedalMap).map(([year, medalsCount]) => ({
      name: year.toString(),
      value: medalsCount
    }));
  }

  get lineChartResults(): any[] {
    return [{ name: 'Médailles', series: this.lineChartData }];
  }
}
