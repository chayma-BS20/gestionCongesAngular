import { Component, EventEmitter, Input, Output, OnInit, AfterViewInit } from '@angular/core';
import { SHService } from 'src/app/services/sh.service';
import * as go from 'gojs';
import { StructureHierarchique } from 'src/app/models/sh';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit, AfterViewInit {
  public diagram: go.Diagram = new go.Diagram();
  public model = new go.GraphLinksModel();
  @Output() public nodeClicked = new EventEmitter();

  @ViewChild('diagramContainer', { static: true }) diagramContainer: ElementRef;
   $ = go.GraphObject.make;

  constructor(private departmentService: SHService) {}
  ngOnInit(): void {
    this.departmentService.getAllStructures().subscribe((departments) => {
   
      
      if (this.diagramContainer) {
        this.diagram = new go.Diagram(this.diagramContainer.nativeElement);
  
        this.diagram.nodeTemplate = this.$(
          go.Node,
          "Auto",
       
          this.$(go.Shape, "RoundedRectangle", {
            fill: "lightblue",
            stroke: "gray",
            strokeWidth: 2, // Épaisseur de la bordure
            // Coins arrondis avec un rayon de 10 pixels
            parameter1: 10,
          }),
          this.$(go.TextBlock, { margin: 8 }, new go.Binding("text", "text"))
        );

this.diagram.linkTemplate = this.$(
  go.Link,
  this.$(go.Shape, { stroke: "gray" })
);

this.diagram.layout = this.$(go.LayeredDigraphLayout, {
  direction: 1, 
});


        
this.diagram.updateAllTargetBindings();

        const { nodeDataArray, linkDataArray } = this.transformDataForGoJS(departments);
        this.initializeDiagram(nodeDataArray, linkDataArray);
  
        this.diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
      }
    });
  }
  
  
  

  ngAfterViewInit(): void {
    this.departmentService.getAllStructures().subscribe((departments) => {
  
      console.log( this.transformDataForGoJS(departments));
  
      setTimeout(() => {
        this.diagram.layout = go.GraphObject.make(go.TreeLayout, {
          angle: 90,  
          arrangement: go.TreeLayout.ArrangementVertical,  
          layerSpacing: 40,  
          alternateAngle: 90,  
          alternateLayerSpacing: 40,  
          alternateAlignment: go.TreeLayout.AlignmentBus,  
          alternateNodeSpacing: 20 
        });
      });
    }
  )}
  
  
  

  

  private transformDataForGoJS(departments: StructureHierarchique[], parentID: number | null = null) {
    const nodeDataArray: go.ObjectData[] = [];
    const linkDataArray: go.ObjectData[] = [];
  
    departments.forEach((department) => {
      const nodeData: go.ObjectData = {
        key: department.idsh,
        text: department.libelle, 
        
      };
      this.model.addNodeData(nodeData);
      if (parentID !== null) {
        const linkData: go.ObjectData = {
          from: parentID,
          to: department.idsh,
        };
        this.model.addLinkData(linkData)  
        linkDataArray.push(linkData)

      }
        this.diagram.model=this.model
      nodeDataArray.push(nodeData);
  
      if (department.shenfants && department.shenfants.length > 0) {
        const childrenData = this.transformDataForGoJS(department.shenfants, department.idsh);
        nodeDataArray.push(...childrenData.nodeDataArray);
        linkDataArray.push(...childrenData.linkDataArray);
      }
    });
  
    return { nodeDataArray, linkDataArray };
  }
  
  

  private initializeDiagram(nodeDataArray: go.ObjectData[], linkDataArray: go.ObjectData[]): void {

    this.model.nodeDataArray = nodeDataArray;
    this.model.linkDataArray = linkDataArray;
  
    this.diagram.model = this.model;
  
  
    this.diagram.addDiagramListener('ChangedSelection', (e) => {
      const node = this.diagram.selection.first();
      this.nodeClicked.emit(node);
    });
  }
  
  
  
  
  
  
}
