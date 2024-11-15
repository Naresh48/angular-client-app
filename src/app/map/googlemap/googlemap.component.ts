import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrl: './googlemap.component.css'
})
export class GooglemapComponent implements OnInit {

  map: google.maps.Map | undefined;
  marker: google.maps.Marker | undefined;

  ngOnInit(): void {
    this.loadMap();
  }

  async loadMap(): Promise<void> {
    const loader = new Loader({
      apiKey: 'AIzaSyBJ-3rYRFAL8i8fNr1nX-2blJyHspTnlIc',
      version: 'weekly',
      libraries: ['places'] // No need to add 'marker' explicitly
    });

    // Load the Google Maps API
    const google = await loader.load();

    // Initialize the map
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 23.0225, lng: 72.5714 },
      zoom: 8
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    // Use google.maps.Marker directly
    this.marker = new google.maps.Marker({
      position: { lat: 23.0225, lng: 72.5714 },
      map: this.map,
      title: 'Hello World!'
    });
  }
}