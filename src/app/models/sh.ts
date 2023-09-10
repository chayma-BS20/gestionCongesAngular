// src/app/models/structure-hierarchique.model.ts

import { AjoutUser } from "./ajout-user";

export class StructureHierarchique {
  idsh: number;
  libelle: string;
  shparent: StructureHierarchique | null;
  shenfants: StructureHierarchique[];
  employés: AjoutUser[];
  responsablesList: any[]; // Vous pouvez remplacer `any` par le type approprié

  constructor(
  
  ) {
   
  }
}
