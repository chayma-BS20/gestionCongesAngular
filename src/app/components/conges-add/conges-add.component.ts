import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CongesService } from 'src/app/services/conges.service';
import { DemandeCongeEnAttente } from 'src/app/models/conges'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any; // Importez jQuery
import { Moment } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';7
import { formatDate } from '@angular/common';
import { PlannerDialogComponentComponent } from '../planner-dialog-component/planner-dialog-component.component';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-conges-add',
  templateUrl: './conges-add.component.html',
  styleUrls: ['./conges-add.component.css']
})
export class CongesAddComponent implements OnInit {

  types: string[] = [
    'ACCIDENT DE TRAVAIL',
    'ACCIDENT PARCOURS',
    'AUTORISATION DE SORTIE',
    'AVERTISSEMENT',
    "CIRCONCISION D'UN ENFANT",
    'CONFINEMENT',
    'CONGE ANNUEL',
    'CONGE DE RECUPERATION EN JOUR',
    'CONGÉ MALADIE',
    'CONGE MATERNITE',
    'CONGE PATERNITE',
    'CONGE RECUPERATION EN HEURE',
    'CONGE SANS SOLDE',
    'CONSEIL EN COURS',
    'CONSULTATION MEDICALE EN HEURE',
    'CONSULTATION MEDICALE EN JOUR',
    'DECES (FRERE, SOEUR)',
    'DECES D\'UN PARENT( PERE, MERE,FILS,CONJOINT)',
    'DECES PARENT PROCHE',
    'FORMATION',
    'MALADIE ENFANT',
    'MALADIE NON JUSTIFIER',
    'MALADIE PROFESSIONNELLE',
    "MARIAGE D'UN ENFANT",
    'MARIAGE DU TRAVAILLEUR',
    'MISE A PIED 1 JOUR',
    'MISE A PIED 10 JOURS',
    'MISE A PIED 15 JOURS',
    'MISE A PIED 2 JOURS',
    'MISE A PIED 21 JOURS',
    'MISE A PIED 3 JOURS',
    'MISE A PIED 30 JOURS',
    'MISE A PIED 4 JOURS',
    'MISE A PIED 7 JOURS',
    'MISE A PIED EN HEURES',
    'PROBLÈME DE TRANSPORT',
    'RENVOI DEFINITIVE',
    'RETARD AUTORISÉE',
    'RETARD NON AUTORISEE',
    'SERVICE MILITAIRE',
    'TRAVAIL A DISTANCE',
    'VOYAGE MISSION'
  ];
  congesForm: FormGroup; // Déclarez le formulaire réactif
  isAddCongesForm:boolean=false ;
  nb_solde: number;
  
  showPlanner: boolean = false;


 
  utilisateurStatique = {
    idUser: 14,
    nom: 'Nom',
    prenom: 'Prenom',
    numeroTelephone: 99900011,
    dateDeNaissance: new Date('1993-07-05'), // Convertir en objet Date
    email: 'sophial@example.com',
    genre: 'f',
    login: 'sophial',
    role: 'resp serv data science',
    cin :'54321098',
    mdp:'sophia0011',
    nb_solde:0
  };
  newConges: DemandeCongeEnAttente;

  constructor(private congesService: CongesService, private formBuilder: FormBuilder, private dialog: MatDialog,private userService: UserService) {
    this.congesForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', [Validators.required]],
      type: [''],
    });
    
  }
  
  ngOnInit(): void {
    this.isAddCongesForm=false;
    this.resetForm();
  }
  async afficherPlanner(): Promise<void> {
    // Ouvrez le planner dans une fenêtre modale en utilisant MatDialog
    const dialogRef = this.dialog.open(PlannerDialogComponentComponent, {
      width: '80%',
      height: '80%',
      data: {} // Vous pouvez passer des données au composant du planner si nécessaire
    });
    this.showPlanner=true;

    dialogRef.afterClosed().subscribe((result) => {
      // Vous pouvez ajouter un code à exécuter après la fermeture de la fenêtre modale ici.
    });
  }
  async addConges(): Promise<void> {
    if (this.showPlanner) {
      return;
    }
    const type = this.congesForm.get('type')?.value;
    const dateDebut = this.congesForm.get('dateDebut')?.value;
    const dateFin = this.congesForm.get('dateFin')?.value;
  
    const dateDebutFormatted = formatDate(dateDebut, 'yyyy-MM-dd', 'en-US');
    const dateFinFormatted = formatDate(dateFin, 'yyyy-MM-dd', 'en-US');

    this.userService.getUserInfo(12).subscribe((AjoutUser) => {
      // Stockez les informations dans les variables
      this.nb_solde = AjoutUser.nb_solde;
      console.log(this.nb_solde);
    });

    if (dateDebut && dateFin && dateDebut > dateFin) {
      alert("La date de fin ne peut pas être avant la date de début.");
      this.openAlertDialog('Erreur', 'La date de fin ne peut pas être avant la date de début.');
            return;
    }
    try {
      const chevauchement = await this.congesService.checkChevauchement(dateDebut, dateFin).toPromise();
 
      if(this.nb_solde>=26){
        console.log("hhhhhhhhh"+this.nb_solde)
        alert("Vous n'avez plus de solde pour un nouveau conges");
        this.openAlertDialog('Erreur', "Vous n'avez plus de solde pour un nouveau congé");

      }
      if (chevauchement) {
        console.log("Chevauchement détecté");
        alert("Vous avez déjà un congé réservé durant cette période.");
        this.openAlertDialog('Erreur', 'Vous avez déjà un congé réservé durant cette période.');

      } else {
        console.log("Pas de chevauchement");
        this.newConges.dateDebut = new Date(dateDebutFormatted);
        this.newConges.dateFin = new Date(dateFinFormatted);
        this.newConges.type = type;
  
        const result = await this.congesService.addConges(this.newConges).toPromise();
        console.log("votre demande de congé est en cours de traitement", result);
        alert("votre demande de congé est en cours de traitement");
        this.openAlertDialog('Succès', 'Votre demande de congé est en cours de traitement.');
        this.resetForm();
      }
    
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      this.openAlertDialog('Erreur', 'Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  }
  
  // Supprimez la fonction saveConges car elle n'est plus nécessaire
  
    async onFormSubmit(): Promise<void> {
      if (this.congesForm.valid) {
        console.log('Formulaire soumis:', this.congesForm.value);
        await this.addConges(); // Attendez que l'ajout de congés soit terminé avant de réinitialiser le formulaire
      } else {
        console.log('Le formulaire est invalide');
      }
    }
  
  
  

 
  
  saveConges(): void {
    this.congesService.addConges(this.newConges).subscribe(
      (conges: DemandeCongeEnAttente) => {
        console.log('Congés ajouté:', conges);
  
        this.resetForm(); 
    
      },
      (error) => {
        console.error('Erreur lors de l\'ajout des congés:', error);
      }
    );
  }
  

  
  private resetForm(): void {
    this.newConges = new DemandeCongeEnAttente(0, new Date(), new Date(), new Date(), '', '', this.utilisateurStatique);
    this.congesForm.reset();
  }
  
  openAlertDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px', // Ajustez la largeur selon vos besoins
      data: {
        title: title,
        message: message
      }
    });
  }
}