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
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

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

  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable();
  }

  getCountryById(id: number): Observable<OlympicCountry | undefined> {
    return this.olympics$.asObservable().pipe(
      map((countries) => countries.find(c => c.id === id))
    );
  }

  getLoadingStatus() {
    return this.loading$.asObservable();
  }

  getError() {
    return this.error$.asObservable();
  }
}
