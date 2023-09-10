import { Component, OnInit } from '@angular/core';
import { StructureHierarchique } from 'src/app/models/sh';
import { SHService } from 'src/app/services/sh.service';

@Component({
  selector: 'app-sh',
  templateUrl: './sh.component.html',
  styleUrls: ['./sh.component.css']
})
export class SHComponent implements OnInit {
  structures: StructureHierarchique[] = [];
  departementsExistantes: StructureHierarchique[] = [];
  selectedParentId: number | null = null;
  newStructure: StructureHierarchique = new StructureHierarchique(

  );

  constructor(private shService: SHService) {
    this.selectedParentId = null
  }

  ngOnInit(): void {
    this.getDepartementsExistantes();
  }
  getDepartementsExistantes() {
    this.shService.getAllStructures().subscribe(
      (data: StructureHierarchique[]) => {
        this.departementsExistantes = data;
        console.log(this.departementsExistantes)
      },
      (error) => {
        console.error('Error fetching existing departments:', error);
      }
    );
  }
  onParentSelectChange() {
    // Vous pouvez vérifier la valeur sélectionnée ici, par exemple :
    console.log('Selected parent ID:', this.selectedParentId);
  }
  addStructure(): void {
  
    if (this.selectedParentId !== null) {
      // Trouver la structure parente en fonction de l'ID sélectionné
      this.shService.findStructureById(this.selectedParentId).subscribe(
        (parentStructure: StructureHierarchique) => {
              // Assigner la structure parente sélectionnée à la nouvelle structure
          this.newStructure.shparent = parentStructure;
  
          // Appelez le service pour ajouter la nouvelle structure
          this.shService.addStructure(this.newStructure).subscribe(
            (structure: StructureHierarchique) => {
              console.log('Structure added:', structure);
              this.shService.getAllStructures().subscribe((structures) => {
                // Les données réelles sont dans la variable 'structures' ici
                console.log(structures);

              });              // Réinitialisez la nouvelle structure après l'ajout
              this.newStructure = new StructureHierarchique(
       
              );
              // Réinitialisez également l'ID de la structure parente sélectionnée
              this.selectedParentId = null;
            },
            (error) => {
              console.error('Error adding structure:', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération de la structure parente :', error);
        }
      );
    } else {
      // Si aucune structure parente n'est sélectionnée, définissez-la sur null (Département racine)
  
      // Appelez le service pour ajouter la nouvelle structure
      this.shService.addStructure(this.newStructure).subscribe(
        (structure: StructureHierarchique) => {
          console.log('Structure added:', structure);
          // Réinitialisez la nouvelle structure après l'ajout
          this.newStructure = new StructureHierarchique(
       
          );
          // Réinitialisez également l'ID de la structure parente sélectionnée
          this.selectedParentId = null;
        },
        (error) => {
          console.error('Error adding structure:', error);
        }
      );
    }
  }
  
  
}
