import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);
  private loading$ = new BehaviorSubject<boolean>(false);  
  private error$ = new BehaviorSubject<string | null>(null); 

  constructor(private http: HttpClient) {}

  loadInitialData() {
    this.loading$.next(true); 
    return this.http.get<any>(this.olympicUrl).pipe(
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

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getLoadingStatus() {
    return this.loading$.asObservable();
  }

  getError() {
    return this.error$.asObservable();
  }
}
