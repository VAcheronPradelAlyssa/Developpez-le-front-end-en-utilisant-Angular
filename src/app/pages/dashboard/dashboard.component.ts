import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;
  public loading: boolean = true; 
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData()
    //.pipe(delay(15000))
    .subscribe(() => {
      this.olympicService.getOlympics().subscribe({
        next: (data: OlympicCountry[]) => {
          if (data) {
            this.numberOfJOs = this.calculateUniqueYears(data);
            this.numberOfCountries = data.length;
          }
          this.loading = false; 
        },
        error: (error) => {
          console.error('Erreur lors du chargement des données', error);
          this.loading = false; 
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
