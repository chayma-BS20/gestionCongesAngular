
import { Component, OnInit, ViewChild } from '@angular/core';
import { AjoutUser } from 'src/app/models/ajout-user';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit  {
  users: AjoutUser[] = [];
  editingUser: AjoutUser | null = null;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(  
    private userService: UserService,
    private _snackBar: MatSnackBar,

  ){}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {this.loadUsers()}

  loadUsers() {
    this.userService.getUsers().subscribe(
      (users: AjoutUser[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    );
  }
  openEditForm(user: AjoutUser) {
    this.editingUser = user; // Stockez l'utilisateur en cours d'édition
  }

  
  deleteEmployee(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        alert("Supression avec succés");
        this._snackBar.open('Employé selectionné a été supprimé', 'Fermer', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
        this.loadUsers();
      },
      error: console.log,
    });
  }
}
