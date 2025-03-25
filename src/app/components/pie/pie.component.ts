import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie',
  template: `
    
        <ngx-charts-pie-chart
          [view]="[700, 500]"
          [results]="pieChartData"
          [legend]="showLegend"
          [labels]="showLabels"
          [doughnut]="doughnut"
          [gradient]="gradient"
          [explodeSlices]="explodeSlices"
          [trimLabels]="trimLabels"
          [labelFormatting]="labelFormatting"
          (select)="onSelect($event)">
        </ngx-charts-pie-chart>
   
  `,
  styleUrls: ['./pie.component.scss'],
  standalone: false
})
export class PieComponent implements OnInit {
  public pieChartData: any[] = [];
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;

 
 
  showLegend = false;
  showLabels = true;
  doughnut = false;
  gradient = false;
  explodeSlices = false;
  trimLabels = false;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe(() => {
      this.olympicService.getOlympics().subscribe((data: OlympicCountry[]) => {
        if (data) {
          this.pieChartData = data.map((country) => ({
            name: country.country,
            value: this.getTotalMedals(country.participations),
            extra: { countryId: country.id }
          }));

          this.numberOfJOs = this.calculateUniqueYears(data);
          this.numberOfCountries = data.length;
        }
      });
    });
  }

  private getTotalMedals(participations: any[]): number {
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }

  private calculateUniqueYears(countries: OlympicCountry[]): number {
    const years = new Set<number>();
    countries.forEach((country) => {
      country.participations.forEach((participation) => {
        years.add(participation.year);
      });
    });
    return years.size;
  }

  onSelect(event: any): void {
    if (event && event.extra) {
      const countryId = event.extra.countryId;
      this.router.navigate(['/details', countryId]);
    }
  }

  labelFormatting = (value: any) => {
    return value.toUpperCase();
  };
}
