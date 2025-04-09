import { Component, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';

@Component({
  selector: 'app-line', 
  template: `
    
    <ngx-charts-line-chart
      *ngIf="lineChartData && lineChartData.length > 0"
      [view]="view"
      [results]="[{ name: 'Medals', series: lineChartData }]"
      [xAxis]="xAxis"
      [yAxis]="yAxis"
      [showXAxisLabel]="showXAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [showGridLines]="showGridLines"
      [gradient]="gradient"
      [tooltipDisabled]="tooltipDisabled">
    </ngx-charts-line-chart>
  `,
  styleUrls: ['./line.component.scss'], 
  standalone: false 
})
export class LineComponent implements OnChanges {
  @Input() data: any[] = []; 
  public lineChartData: any[] = []; 

  // Configuration des axes et des labels du graphique
  xAxis = true;
  yAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Total Medals';
  showGridLines = true;
  gradient = false;
  tooltipDisabled = false;

  view: [number, number] = [700, 400]; // Dimensions initiales du graphique

  // Méthode appelée lorsque les données d'entrée changent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      console.log('Données reçues pour le graphique:', changes['data'].currentValue);
      this.lineChartData = this.transformData(changes['data'].currentValue);
    }
  }

  // Méthode transformer données d'entrée en format utilisable par le graphique String
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

  // événement redimensionner graphique lorsque la fenêtre change de taille
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateChartDimensions();
  }

  // mettre à jour les dimensions du graphique en fonction de la taille de la fenêtre
  private updateChartDimensions(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < 600) {
      this.view = [width - 50, height / 2];
    } else if (width < 1024) {
      this.view = [width - 100, height / 2];
    }
  }
}
