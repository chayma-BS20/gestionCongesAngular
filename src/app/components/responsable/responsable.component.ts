import { Component, OnInit } from '@angular/core';
import { ResponsableService } from 'src/app/services/responsable.service';
import { Responsables } from 'src/app/models/responsable';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableComponent implements OnInit {
  responsables: Responsables[] = [];
  newResponsable: Responsables = new Responsables();

  constructor(private responsableService: ResponsableService) {}

  ngOnInit(): void {
    this.getAllResponsables();
  }

  getAllResponsables(): void {
    this.responsableService.getAllResponsables().subscribe(
      (data: Responsables[]) => {
        this.responsables = data;
      },
      (error) => {
        console.error('Error fetching responsables:', error);
      }
    );
  }

  addResponsable(): void {
    this.responsableService.addResponsable(this.newResponsable).subscribe(
      (responsable: Responsables) => {
        console.log('Responsable added:', responsable);
        this.newResponsable = new Responsables();
        this.getAllResponsables();
      },
      (error) => {
        console.error('Error adding responsable:', error);
      }
    );
  }
}
