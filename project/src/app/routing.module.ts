import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreatePigComponent } from './create-pig/create-pig.component';
import { EditPigComponent } from './edit-pig/edit-pig.component';
import { PigListComponent } from './pig-list/pig-list.component';
import { MapComponent } from './map/map.component';

const appRoutes:Routes = [
  { path: '', component: PigListComponent },
  { path: '', component: MapComponent },
  { path: 'add', component: CreatePigComponent },
  { path: 'edit/:pID', component: EditPigComponent }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
