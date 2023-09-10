import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DemandeCongeEnAttente } from '../models/conges';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  private apiUrl = 'http://localhost:8083/demandes-conge-en-attente';

  constructor(private http: HttpClient) { }

  getConges(): Observable<DemandeCongeEnAttente[]> {
    return this.http.get<DemandeCongeEnAttente[]>(`${this.apiUrl}/lister-en-attente`);
  }

  addConges(conges: DemandeCongeEnAttente): Observable<DemandeCongeEnAttente> {
    return this.http.post<DemandeCongeEnAttente>(`${this.apiUrl}/soumettre`, conges);
  }

  deleteConges(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  updateConges(id: number, conges: DemandeCongeEnAttente): Observable<DemandeCongeEnAttente> {
    return this.http.put<DemandeCongeEnAttente>(`${this.apiUrl}/update/${id}`, conges);
  }

  checkChevauchement(dateDebut: Date, dateFin: Date): Observable<boolean> {
    const url = `${this.apiUrl}/checkChevauchement`;
    // Créez un objet qui contient les dates de début et de fin
    const data = { dateDebut, dateFin };
    return this.http.post<boolean>(url, data);
  }

  getCongesByUserId(userId: number): Observable<DemandeCongeEnAttente[]> {
    return this.http.get<DemandeCongeEnAttente[]>(`${this.apiUrl}/user/${userId}`);
  }
  approuverConge(id: number, conges: DemandeCongeEnAttente): Observable<void> {
    const url = `${this.apiUrl}/approuver/${id}`;
    return this.http.put<void>(url, conges);
  }

  refuserConge(id: number, conges: DemandeCongeEnAttente): Observable<void> {
    const url = `${this.apiUrl}/refuser/${id}`;
    return this.http.put<void>(url, conges);
  }
}
