import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsables } from '../models/responsable';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  private apiUrl = 'http://localhost:8083/responsable';

  constructor(private http: HttpClient) {}

  getAllResponsables(): Observable<Responsables[]> {
    return this.http.get<Responsables[]>(`${this.apiUrl}/get`)
      .pipe(
        catchError(error => {
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }

  addResponsable(responsable: Responsables): Observable<Responsables> {
   
    return this.http.post<Responsables>(`${this.apiUrl}/add`, responsable);
  
   }
}
