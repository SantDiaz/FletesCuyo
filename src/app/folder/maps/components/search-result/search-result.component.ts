import { Component  } from '@angular/core';
import { Feature } from '../../interface/places';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent  {
  
  // private debounceTimer?: NodeJS.Timeout;

  constructor( private placesService: PlacesService,
               private mapService: MapService
    ) { }

get isLoadingPlaces(){
  return this.placesService.isLoadingPlaces;
}

get places(): Feature[] {
  return this.placesService.places;
}

flyTo( place: Feature){
  const [lng, lat] = place.center;
  this.mapService.flyTo([lng, lat])
}

}
