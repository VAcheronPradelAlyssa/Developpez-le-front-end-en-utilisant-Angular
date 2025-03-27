import { Component, OnInit, HostListener } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie',
  template: `
    <ngx-charts-pie-chart
      [view]="view"
      [results]="pieChartData"
      [legend]="showLegend"
      [labels]="showLabels"
      [doughnut]="doughnut"
      [gradient]="gradient"
      [explodeSlices]="explodeSlices"
      [trimLabels]="trimLabels"
      (select)="onSelect($event)">
    </ngx-charts-pie-chart>
  `,
  styleUrls: ['./pie.component.scss'],
  standalone: false
})
export class PieComponent implements OnInit {
  public pieChartData: any[] = [];
  public view: [number, number] = [700, 500];  

  showLegend = false;
  showLabels = true;
  doughnut = false;
  gradient = false;
  explodeSlices = false;
  trimLabels = false;  

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe(() => {
      this.olympicService.getOlympics().subscribe((data: OlympicCountry[]) => {
        if (data) {
          this.pieChartData = data.map((country) => ({
            name: country.country,
            value: this.getTotalMedals(country.participations),
            extra: { countryId: country.id }
          }));
        }
      });
    });
  }

  private getTotalMedals(participations: any[]): number {
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }

  onSelect(event: any): void {
    if (event && event.extra) {
      const countryId = event.extra.countryId;
      this.router.navigate(['/details', countryId]);
    }
  }

 

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateChartDimensions();
  }

  private updateChartDimensions(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width < 600) {

      this.view = [width - 50, height / 2];  
    } else if (width < 1024) {

      this.view = [width - 100, height / 2];
    } else {

      this.view = [700, 500];  
    }
  }


  
}
