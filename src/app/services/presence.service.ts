import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presence } from '../models/presence'; // Assurez-vous que le chemin d'accès est correct

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private apiUrl = 'http://localhost:8083/presences'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  getPresences(): Observable<Presence[]> {
    return this.http.get<Presence[]>(this.apiUrl);
  }

  addPresence(presence: Presence): Observable<Presence> {
    return this.http.post<Presence>(`${this.apiUrl}/add`, presence);
  }

  getAllPresences(): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${this.apiUrl}/getAll`);
  }
}
