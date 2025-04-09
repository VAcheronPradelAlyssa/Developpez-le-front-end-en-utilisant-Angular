import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { OlympicService } from 'src/app/core/services/olympic.service';
import { OlympicCountry } from 'src/app/core/models/Olympic'; 
import { delay } from 'rxjs/operators'; 

@Component({
  selector: 'app-details', 
  templateUrl: './details.component.html', 
  styleUrls: ['./details.component.scss'], 
  standalone: false 
})
export class DetailsComponent implements OnInit {
  public country: OlympicCountry | undefined; 
  public loading: boolean = true; 
  public error: boolean = false; 

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) {}

  ngOnInit(): void {
    const countryId = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID du pays depuis la route
    if (countryId) {
      this.olympicService.getCountryById(+countryId)
        //.pipe(delay(5000)) // Délai artificiel pour simuler un chargement plus long 
        .subscribe({
          next: (country) => {
            this.country = country; 
            this.loading = false;
          },
          error: (error) => {
            this.error = true;
            this.loading = false;
            console.error('Erreur:', error);
          }
        });
    }
  }

  // Méthode pour calculer le total des médailles pour un pays
  getTotalMedals(participations: any[]): number {
    return participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }

  // Méthode pour calculer le total des athlètes pour un pays
  getTotalAthletes(participations: any[]): number {
    return participations.reduce((total, participation) => total + participation.athleteCount, 0);
  }
}
