import { AjoutUser } from "./ajout-user";

export class DemandeCongeEnAttente  {
  idConges: number;
  dateDebut: Date;
  dateFin: Date;
  dateCreation: Date;
  etat: string;
  type: string;

  user: AjoutUser;

  constructor(idConges: number, dateDebut: Date, dateFin: Date, dateCreation: Date, etat: string, type: string, user: AjoutUser) {
    this.idConges = idConges;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.dateCreation = dateCreation;
    this.etat = etat;
    this.type = type;
    this.user = user;
  }
}
