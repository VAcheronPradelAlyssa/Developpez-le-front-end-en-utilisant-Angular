import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { BehaviorSubject, Observable } from 'rxjs'; 
import { catchError, tap, finalize, map } from 'rxjs/operators'; 
import { OlympicCountry } from 'src/app/core/models/Olympic';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json'; 
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]); // Sujet pour stocker les données olympiques
  private loading$ = new BehaviorSubject<boolean>(false); // Sujet pour gérer l'état de chargement
  private error$ = new BehaviorSubject<string | null>(null); // Sujet pour gérer les erreurs

  // Injection du HttpClient dans le constructeur
  constructor(private http: HttpClient) {}

  // Méthode pour charger les données initiales depuis le fichier JSON
  loadInitialData() {
    this.loading$.next(true); 
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next(value); 
        this.error$.next(null); 
      }),
      catchError((error) => {
        this.error$.next('Une erreur est survenue lors du chargement des données.');
        console.error('Erreur de chargement des données :', error);
        return [];
      }),
      finalize(() => {
        this.loading$.next(false); 
      })
    );
  }

  // Méthode pour obtenir les données olympiques sous forme d'Observable
  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable();
  }

  // Méthode pour obtenir un pays olympique par son ID
  getCountryById(id: number): Observable<OlympicCountry | undefined> {
    return this.olympics$.asObservable().pipe(
      map((countries) => countries.find(c => c.id === id)) 
    );
  }

  // Méthode pour obtenir l'état de chargement sous forme d'Observable
  getLoadingStatus() {
    return this.loading$.asObservable();
  }

  // Méthode pour obtenir les erreurs sous forme d'Observable
  getError() {
    return this.error$.asObservable();
  }
}
