export class AjoutUser {
  idUser: number = 0;
  nom: string;
  prenom: string;
  role: string;
  cin: string;
  numeroTelephone: number;
  email: string;
  genre: string;
  dateDeNaissance: Date;
  login: string;
  mdp: string;
  nb_solde:number;

  constructor(
    nom: string,
    prenom: string,
    role: string,
    cin: string,
    numeroTelephone: number,
    email: string,
    genre: string,
    dateDeNaissance: Date,
    login: string,
    mdp: string,
    nb_solde:number
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.role = role;
    this.cin = cin;
    this.numeroTelephone = numeroTelephone;
    this.email = email;
    this.genre = genre;
    this.dateDeNaissance = dateDeNaissance;
    this.login = login;
    this.mdp = mdp;
    this.nb_solde=nb_solde ;
  }

  
  
  
  

  }

