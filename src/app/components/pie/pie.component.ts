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
      [tooltipDisabled]="false"
      [labelFormatting]="labelFormatting"
      (select)="onSelect($event)">
    </ngx-charts-pie-chart>
  `,
  styleUrls: ['./pie.component.scss'],
  standalone: false
})
export class PieComponent implements OnInit {
  public pieChartData: any[] = [];

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

  labelFormatting = (value: any) => {
    return value.toUpperCase();
  };
}
