import { AjoutUser } from "./ajout-user";
import { StructureHierarchique } from "./sh";
export class Responsables {
    id_responsable: number;
    responsable: AjoutUser; // Assuming you have a User model
    structure: StructureHierarchique; // Assuming you have a StructureHierarchique model
    dateDebut: Date;
    dateFin: Date;
    constructor(
    
        ) {
         
        }
}
