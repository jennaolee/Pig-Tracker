import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DataTablesModule} from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { PigComponent } from './pig/pig.component';
import { PigListComponent } from './pig-list/pig-list.component';
import { MapComponent } from './map/map.component';
import { CreatePigComponent } from './create-pig/create-pig.component';
import { SearchPipe } from './search.pipe';
import { CountPigsPipe } from './count-pigs.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PigInfoComponent } from './pig-info/pig-info.component';
import { RoutingModule } from './routing.module';
import { EditPigComponent } from './edit-pig/edit-pig.component';
import { MarkerService } from './marker.service';


@NgModule({
  declarations: [
    AppComponent,
    PigComponent,
    PigListComponent,
    MapComponent,
    CreatePigComponent,
    SearchPipe,
    CountPigsPipe,
    PigInfoComponent,
    EditPigComponent,

  ],
  
  imports: [
    BrowserModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule
  ],

  providers: [PigListComponent, CreatePigComponent, MapComponent, MarkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
