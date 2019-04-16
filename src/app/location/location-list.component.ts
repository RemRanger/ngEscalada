import { Component, OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { ILocation } from './location';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit
{
  locations: ILocation[] = [];
  errorMessage = '';
  minLat: number;
  maxLat: number;
  minLong: number;
  maxLong: number;
  midLat: number;
  midLong: number;

  constructor(private locationService: LocationService) { }

  ngOnInit()
  {
    this.locationService.getLocations().subscribe
      (
        locations => this.locations = locations,
        error => this.errorMessage = <any>error
      );

    for (let location of this.locations)
    {
      if (this.minLat == undefined || location.latitude < this.minLat)
        this.minLat = location.latitude;
      if (this.maxLat == undefined || location.latitude > this.maxLat)
        this.maxLat = location.latitude;
      if (this.minLong == undefined || location.latitude < this.minLong)
        this.minLong = location.latitude;
      if (this.maxLong == undefined || location.latitude > this.maxLong)
        this.maxLong = location.latitude;

      this.midLat = (this.maxLat - this.minLat) / 2;
      this.midLong = (this.maxLong - this.minLong) / 2;
    }
  }

  getApiUrl(): string { return this.locationService.apiUrl; }
}
