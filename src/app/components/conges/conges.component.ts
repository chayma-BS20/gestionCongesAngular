import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandeCongeEnAttente } from 'src/app/models/conges';
import { CongesService } from 'src/app/services/conges.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { AjoutUser } from 'src/app/models/ajout-user';
import { MatDialog } from '@angular/material/dialog';
import { CongeDetailsDialogComponentComponent } from 'src/app/components/conge-details-dialog-component/conge-details-dialog-component.component';
@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css']
})
export class CongesComponent implements OnInit {
  conges: DemandeCongeEnAttente[] = [];
  displayedColumns: string[] = ['dateDebut', 'dateFin', 'type', 'dateCreation', 'email','actions'];
    editingConges: DemandeCongeEnAttente | null = null;
    email: string;
    User:AjoutUser;

    selectedConge: DemandeCongeEnAttente | null = null;
    demandeconges: DemandeCongeEnAttente[] = [];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private congesService: CongesService,private userService: UserService , private dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.loadConges();
  }

  loadConges() {
    this.congesService.getConges().subscribe(
      (conges: DemandeCongeEnAttente[]) => {
        for (const conge of conges) {
          this.dataSource = new MatTableDataSource(conges);
          this.userService.getUserInfo(12).subscribe((AjoutUser) => {
            // Stockez les informations dans les variables
            this.email = AjoutUser.email;

        this.dataSource = new MatTableDataSource(conges);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Erreur lors du chargement des congés:', error);
      }
    );
  }
}
    );
  }

  selectConge(conge: DemandeCongeEnAttente): DemandeCongeEnAttente {
    // Lorsque vous sélectionnez un congé, stockez-le dans la variable selectedConge
    this.selectedConge = conge;
    return this.selectedConge;
  }

  
  openDetailsDialog(conge: DemandeCongeEnAttente): void {
    this.selectedConge=this.selectConge(conge);
     const dialogRef = this.dialog.open(CongeDetailsDialogComponentComponent, {
      width: '400px',
      data: this.selectedConge, // Transmettez this.selectedConge au composant de dialogue
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // Code à exécuter après la fermeture du dialogue
      // Par exemple, rafraîchir la liste des congés si nécessaire
      this.loadConges();
    });
  }
  

  openEditForm(conges: DemandeCongeEnAttente) {
    this.editingConges = conges;
  }

  deleteConges(id: number) {
    this.congesService.deleteConges(id).subscribe({
      next: (res) => {
        this.loadConges();
      },
      error: console.log,
    });
  }
}
