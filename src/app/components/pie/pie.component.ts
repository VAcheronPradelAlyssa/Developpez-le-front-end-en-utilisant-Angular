import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
  standalone: false
})
export class PieComponent implements OnInit {
  public pieChartData: any[] = [];
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public numberOfJOs: number = 0; // Nombre de Jeux Olympiques
  public numberOfCountries: number = 0; // Nombre de pays

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe(() => {
      this.olympicService.getOlympics().subscribe((data: OlympicCountry[]) => {
        if (data) {
          // total des médailles
          this.pieChartData = data.map((country) => ({
            name: country.country,
            value: this.getTotalMedals(country.participations),
          }));

          //  nombre de Jeux Olympiques
          this.numberOfJOs = this.calculateUniqueYears(data);

          // nombre de pays
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
        years.add(participation.year); // Ajouter année unique
      });
    });

    return years.size; //  nombre d'années uniques (JOs)
  }

  onSelect(event: any): void {
    console.log(event);
  }

  labelFormatting = (value: any) => {
    return value.toUpperCase();
  };
}
