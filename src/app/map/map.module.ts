import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { GooglemapComponent } from './googlemap/googlemap.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SearchComponent } from '../search/search.component';

@NgModule({
  declarations: [
    GooglemapComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    GoogleMapsModule
  ]
})
export class MapModule { }
