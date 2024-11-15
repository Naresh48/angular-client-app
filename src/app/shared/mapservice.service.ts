import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {

  private markerCoordinatesSource = new Subject<{ lat: number, lng: number }>();
  markerCoordinates$ = this.markerCoordinatesSource.asObservable();

  setMarkerCoordinates(lat: number, lng: number) {
    this.markerCoordinatesSource.next({ lat, lng });
  }
}
