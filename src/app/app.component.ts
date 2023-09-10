import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SHService } from './services/sh.service';
import { StructureHierarchique } from './models/sh';
import * as go from 'gojs';
import { DiagramComponent } from './components/diagram/diagram.component';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'GestionCongesTestFinal-app';
  department: StructureHierarchique;
  isAddFormVisible: boolean = false;
  isUserListVisible: boolean = false;
  isshowAddCongesForm: boolean = false;
  isCongeListVisible: boolean = false;
  public selectedNode = null;

  isAddSh: boolean = false;
  isListSh: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private shService: SHService
  ) {}

  ngOnInit(): void {
   

}
      
    
    


  public setSelectedNode(node: any) {
    this.selectedNode = node;
  }

  AddEmpForm() {
    this.isAddFormVisible = true;
  }

  showListUser() {
    this.isUserListVisible = true;
  }

  toggleAddForm() {
    this.isAddFormVisible = !this.isAddFormVisible;
    this.isUserListVisible = false;
  }

  toggleUserList() {
    this.isUserListVisible = !this.isUserListVisible;
    this.isAddFormVisible = false;
  }

  toggleAddConges() {
    this.isshowAddCongesForm = !this.isshowAddCongesForm;
    this.isCongeListVisible = false;
  }

  toggleUserConges() {
    this.isCongeListVisible = !this.isCongeListVisible;
    this.isshowAddCongesForm = false;
  }

  toggleAddSH() {
    this.isAddSh = !this.isAddSh;
    this.isListSh = false;
  }

  toggleisListSh() {
    this.isListSh = !this.isListSh;
    this.isAddSh = false;
  }

  openAddEmpForm() {}
}
