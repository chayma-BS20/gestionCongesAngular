import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DemandeCongeEnAttente } from 'src/app/models/conges';
import { CongesService } from 'src/app/services/conges.service';
import { UserService } from 'src/app/services/user.service';
import { AjoutUser } from 'src/app/models/ajout-user';

@Component({
  selector: 'app-planner-dialog',
  templateUrl: './planner-dialog-component.component.html',
  styleUrls: ['./planner-dialog-component.component.css']
})
export class PlannerDialogComponentComponent implements OnInit {
  conges: DemandeCongeEnAttente[] = [];
  dataSource: MatTableDataSource<DemandeCongeEnAttente>;
  nom: string;
  nb_solde: number;
  displayedColumns: string[] = ['dateDebut', 'dateFin', 'type', 'Supprimer'];
  message: string;
  reste: number;
  utrouvé: AjoutUser;

  constructor(
    private congesService: CongesService,
    public dialogRef: MatDialogRef<PlannerDialogComponentComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = 12; // Remplacez par l'ID de l'utilisateur dont vous voulez afficher les congés
    this.congesService.getCongesByUserId(userId).subscribe(
      (conges: DemandeCongeEnAttente[]) => {
        this.conges = conges;
        this.dataSource = new MatTableDataSource(conges);
        
        // Obtenez les informations de l'utilisateur
          this.userService.getUserInfo(12).subscribe((AjoutUser) => {
          this.nom = AjoutUser.nom;
          this.nb_solde = AjoutUser.nb_solde;
          this.reste = 26 - this.nb_solde;
          
          if (this.nb_solde >= 26) {
            this.message = "Vous n'avez plus de solde pour bénéficier d'un congé";
          } else {
            this.message = "Bonjour " + this.nom + ". Vous avez encore " + this.reste + " jours. Profitez !";
          }
        });
      },
      (error) => {
        console.error("Erreur lors de la récupération des congés :", error);
      }
    );
  }
 
  deleteConge(id: number) {
    this.congesService.deleteConges(id).subscribe({
      next: (res) => {
        alert("Supression avec succés");
        this.ngOnInit();
      },
      error: console.log,
    });
  }
  setupCalendar(): void {
    // Vous pouvez utiliser une bibliothèque de calendrier telle que FullCalendar
    // pour afficher les congés sur le calendrier.
    // Consultez la documentation de FullCalendar pour l'intégrer correctement dans votre application.
  }
}
