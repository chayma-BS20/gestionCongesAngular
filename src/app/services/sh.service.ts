import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StructureHierarchique } from '../models/sh';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SHService {

  constructor(private http: HttpClient) {}
  // src/app/services/structure-hierarchique.service.ts


  private apiUrl = 'http://localhost:8083/SH'; // Correction de l'URL


  getAllStructures(): Observable<StructureHierarchique[]> {
    return this.http.get<StructureHierarchique[]>(`${this.apiUrl}/getAll`)
      .pipe(
        catchError(error => {
          console.error('Une erreur s\'est produite :', error);
          throw error; // Vous pouvez choisir de lancer l'erreur à nouveau ou de la gérer ici
        })
      );
  }
  addStructure(structure: StructureHierarchique): Observable<StructureHierarchique> {
    return this.http.post<StructureHierarchique>(`${this.apiUrl}/add`, structure);
  }
  findStructureById(idSH: number): Observable<StructureHierarchique> {
    return this.http.get<StructureHierarchique>(`${this.apiUrl}/findById/${idSH}`)
      .pipe(
        catchError(error => {
          console.error('Une erreur s\'est produite :', error);
          throw error;
        })
      );
  }
}


