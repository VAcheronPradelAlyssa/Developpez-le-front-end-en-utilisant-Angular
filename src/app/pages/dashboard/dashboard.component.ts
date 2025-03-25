import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe(() => {
      this.olympicService.getOlympics().subscribe((data: OlympicCountry[]) => {
        if (data) {
          this.numberOfJOs = this.calculateUniqueYears(data);
          this.numberOfCountries = data.length;
        }
      });
    });
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
}
