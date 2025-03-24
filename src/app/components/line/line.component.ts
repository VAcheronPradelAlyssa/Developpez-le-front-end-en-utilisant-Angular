import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  standalone: false
})
export class LineComponent implements OnChanges {
  @Input() data: any[] = []; 
  public lineChartData: any[] = []; 

  public colorScheme = { domain: ['#5AA454'] }; 
  public xAxis = true;
  public yAxis = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Année';
  public showYAxisLabel = true;
  public yAxisLabel = 'Nombre de Médailles';

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
}
