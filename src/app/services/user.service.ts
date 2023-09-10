import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AjoutUser } from 'src/app/models/ajout-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private addEmpFormSource = new Subject<void>();
  private showListUserSource = new Subject<void>();
  private apiUrl = 'http://localhost:8083/users'; // Correction de l'URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<AjoutUser[]> {
    return this.http.get<AjoutUser[]>(this.apiUrl);
  }

  addUser(user: AjoutUser): Observable<AjoutUser> {
    return this.http.post<AjoutUser>(`${this.apiUrl}/add`, user);
  }

  updateUser(user: AjoutUser): Observable<AjoutUser> {
    return this.http.put<AjoutUser>(`${this.apiUrl}/${user.idUser}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  addEmpForm$(): Observable<void> {
    return this.addEmpFormSource.asObservable();
  }

  showListUser$(): Observable<void> {
    return this.showListUserSource.asObservable();
  }
  getUserById(userId: number): Observable<AjoutUser> {
    const url = `${this.apiUrl}/${userId}`;
    
    return this.http.get<AjoutUser>(url);
  }
  callAddEmpForm() {
    this.addEmpFormSource.next();
  }

  callShowListUser() {
    this.showListUserSource.next();
  }
  getUserInfo(userId: number): Observable<AjoutUser> {
    return this.http.get<AjoutUser>(`${this.apiUrl}/userinfo/${userId}`);
  }
}
