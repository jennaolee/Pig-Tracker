import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Piggy } from './piggy.Piggy';
import * as L from 'leaflet';

type MapLocation = {
  loc: string;
  long:number;
  lat: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})

export class MarkerService {
  pig: any;
  pigs:Piggy[];
  mapLocations:MapLocation[];
  
  constructor(private http: HttpClient) { 
    this.pigs = [];
    this.mapLocations = []
  }

  makeMarkers(map: L.Map): void {
    this.pigs = [];
    this.mapLocations = []

    this.http.get<Object>('https://272.selfip.net/apps/cglX0SU8fS/collections/pig/documents/')
    .subscribe((data:any)=>{
      this.pig = data
      
      for(let i = 0; i < this.pig.length; i++) {
        this.pigs.push(this.pig[i]["data"])
      }

      for(let i = 0; i < this.pigs.length; i++) {
        let piggy = this.pigs[i]
        let k = 0;

        while(k < this.mapLocations.length && piggy.location != this.mapLocations[k].loc) {
          k++;          
        }

        if (k != this.mapLocations.length) {
          this.mapLocations[k].count++;
        } else {
          let newLocation:MapLocation = {"loc": piggy.location, "long": piggy.longitude, "lat": piggy.latitude, "count": 1};
          this.mapLocations.push(newLocation)
        }

      }

      for (let j = 0; j < this.mapLocations.length; j++) {
        const lon = this.mapLocations[j].long;
        const lat = this.mapLocations[j].lat;

        const marker = L.marker([lon, lat]);
          
        marker.addTo(map).bindPopup("<b>" + this.mapLocations[j].loc + "</b><br />" + this.mapLocations[j].count + " cases reported.").openPopup();
      }
    })
  }
}