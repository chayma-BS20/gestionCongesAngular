import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { PresenceComponent } from './components/presence/presence.component';
import { CongesComponent } from './components/conges/conges.component';
import { SHComponent } from './components/sh/sh.component';
import { ResponsableComponent } from './components/responsable/responsable.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon'; // Importez le module MatIconModule
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserListComponent } from './components/user-list/user-list.component';
import { CongesAddComponent } from './components/conges-add/conges-add.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

import { PlannerDialogComponentComponent } from './components/planner-dialog-component/planner-dialog-component.component';
import { CongeDetailsDialogComponentComponent } from './components/conge-details-dialog-component/conge-details-dialog-component.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { InspectorComponent } from './components/inspector/inspector.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PresenceComponent,
    CongesComponent,
    SHComponent,
    ResponsableComponent,
    UserListComponent,
    CongesAddComponent,
    AlertDialogComponent,
    PlannerDialogComponentComponent,
    CongeDetailsDialogComponentComponent,
    DiagramComponent,
    InspectorComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    BrowserModule,
    BrowserAnimationsModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
