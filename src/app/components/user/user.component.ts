import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AjoutUser } from 'src/app/models/ajout-user';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: AjoutUser = new AjoutUser('', '', '', '', 0, '', '', new Date(), '', '',0);
  userForm: FormGroup;
  users: AjoutUser[] = [];
  submitted = false;
  isFormVisible: boolean = true; // Utilisez une seule variable pour gérer la visibilité
  roleOptions: string[] = ['Manager', 'Employee', 'Admin'];
  AddFormVisible: boolean = false;
  UserListVisible: boolean = false; // Commencez par afficher le formulaire
  private userList :UserListComponent
  displayedColumns: string[] = [
    'idUser',
    'nom',
    'prenom',
    'role',
    'cin',
    'numeroTelephone',
    'email',
    'genre',
    'dateDeNaissance',
    'login',
    'mdp',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      role: ['', Validators.required],
      cin: ['', Validators.required],
      numeroTelephone: ['', Validators.required],
      email: ['', Validators.required],
      genre: ['', Validators.required],
      dateDeNaissance: ['', Validators.required],
      login: ['', Validators.required],
      mdp: ['', Validators.required]
    });
  }
  isAddFormVisible(){
    this.AddFormVisible=true ;
  }
  isUserListVisible(){this.UserListVisible=true;}

  ngOnInit(): void {
    this.AddFormVisible= false;
    this.UserListVisible = false; 
    this.submitted = false;
  }


  


  saveUser() {
    if (this.userForm.valid) {
      this.user = this.userForm.value;
      this.submitted = true;
      this.save();
    }
    
  }

  save() {
    this.userService.addUser(this.user).subscribe(
      (user: AjoutUser) => {
        console.log('Utilisateur ajouté:', user);
        this.user = new AjoutUser('', '', '', '', 0, '', '', new Date(), '', '',0);
        this._snackBar.open('Ajout avec succès', 'Fermer', {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
        this.userList.loadUsers();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    );
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      console.log('Formulaire soumis:', this.userForm.value);
      this.saveUser();
    } else {
      console.log('Le formulaire est invalide');
    }
  }

}
