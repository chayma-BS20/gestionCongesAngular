import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DemandeCongeEnAttente } from './models/conges';
import { Presence } from './models/presence';
import { ResponsableComponent } from './components/responsable/responsable.component';
import { SHComponent } from './components/sh/sh.component';

const routes: Routes = [
  { path: "users", component: UserComponent } , // Nouveau chemin pour l'affichage de la liste d'utilisateurs
  { path: 'conges', component: DemandeCongeEnAttente },
  { path: 'presence', component: Presence },
  { path: 'responsable', component: ResponsableComponent },
  { path: 'sh', component: SHComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
