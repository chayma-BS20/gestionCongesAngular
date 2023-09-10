import { Component, OnInit,Input ,Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DemandeCongeEnAttente } from 'src/app/models/conges';
import { UserService } from 'src/app/services/user.service';
import { AjoutUser } from 'src/app/models/ajout-user';
import { CongesService } from 'src/app/services/conges.service';
import { CongesComponent } from '../conges/conges.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-conge-details-dialog-component',
  templateUrl: './conge-details-dialog-component.component.html',
  styleUrls: ['./conge-details-dialog-component.component.css']
})
export class CongeDetailsDialogComponentComponent implements OnInit{
  demandeCongeId: number; // Stocke l'ID de la demande de congé actuelle
  @Input() selectedConge: DemandeCongeEnAttente | null = null;
  nom: string;
  prenom:string;
  reste: number;
  nb_solde: number;
  type:string;




  constructor(private http: HttpClient,  private userService: UserService,    private _snackBar: MatSnackBar,
 
    private congeService :CongesService ,@Inject(MAT_DIALOG_DATA) public data: DemandeCongeEnAttente | null
    ) {}
  ngOnInit(){
    this.nom = '';
    this.prenom = '';
    this.reste = 0;
    this.nb_solde = 0;
    this.type = '';

    if (this.selectedConge) {
      this.type = this.selectedConge.type;
    } else {
      this.type = 'Type non défini';
    }
  
    this.details();

  }    

  details(){

    this.userService.getUserInfo(12).subscribe((AjoutUser) => {
    this.selectedConge=this.data ;
    console.log(this.selectedConge);
      this.nom = AjoutUser.nom;
      this.nb_solde = AjoutUser.nb_solde;
      console.log(this.nb_solde)
      this.reste = 26 - AjoutUser.nb_solde;
      this.prenom=AjoutUser.prenom;
      if (this.selectedConge) {
        this.type = this.selectedConge.type;
      } 
    }
    )}

    validerConge() {
      if (this.selectedConge && this.selectedConge.idConges !== undefined) {
        this.demandeCongeId = this.selectedConge.idConges;
      } else {
        console.error('La demande de congé ou son ID est indéfini.');
      }
      
      
      
      
      
            if (this.selectedConge !== null) {

      this.congeService.approuverConge(this.demandeCongeId,this.selectedConge).subscribe(
        (response) => {
          console.log('Demande de congé approuvée avec succès', response);
          //A faire envoyer un mail
          alert("conges approuvé")
          this._snackBar.open('Conges approuvé', 'Fermer', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
        },
        (error) => {
          console.error('Erreur lors de l\'approbation de la demande de congé', error);
        }
      );
      }else{
        console.error('this.selectedConge est null. Impossible d\'approuver la demande de congé.');

      }
    }
    
    supprimerConge() {
      if (this.selectedConge !== null) {

      this.congeService.refuserConge(this.demandeCongeId, this.selectedConge).subscribe(
        (response) => {
          //A faire envoyer un mail
          alert("le congé a été refusé")          
          console.log('Demande de congé supprimée avec succès', response);
          this._snackBar.open('Conges refusé', 'Fermer', {
            duration: 3000,
            panelClass: 'fail-snackbar'
          });
        },
        (error) => {
          console.error('Erreur lors de la suppression de la demande de congé', error);
        }
      );
      }else {
        console.error('this.selectedConge est null. Impossible d\'refuserla demande de congé.');

      }
    }
    
  
  
}
