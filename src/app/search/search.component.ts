import { Component, OnInit, ElementRef } from '@angular/core';
import { MapserviceService } from '../shared/mapservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  suggestions: any = [];
  autocompleteService: google.maps.places.AutocompleteService | undefined;
  placesService: google.maps.places.PlacesService | undefined;

  constructor(private elRef: ElementRef, private mapService: MapserviceService) { }

  ngOnInit(): void {
    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
    this.setupAutocomplete();
  }

  setupAutocomplete(): void {
    const input = this.elRef.nativeElement.querySelector('#search-input') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['geocode']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        this.mapService.setMarkerCoordinates(place.geometry.location.lat(), place.geometry.location.lng());
      }
    });

    input.addEventListener('input', (event: any) => {
      const query = event.target.value;
      if (query) {
        this.autocompleteService?.getPlacePredictions({ input: query }, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.suggestions = predictions;
          }
        });
      } else {
        this.suggestions = [];
      }
    });
  }

  selectSuggestion(suggestion: any): void {
    if (this.placesService && suggestion.place_id) {
      this.placesService.getDetails({ placeId: suggestion.place_id }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (place && place.geometry?.location) {
            this.mapService.setMarkerCoordinates(place.geometry.location.lat(), place.geometry.location.lng());
          } else {
            console.error('Place details are missing or incomplete.');
          }
        } else {
          console.error('Failed to retrieve place details:', status);
        }
      });
    }
  }
}