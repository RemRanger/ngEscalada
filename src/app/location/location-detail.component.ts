import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from './location.service';
import { ILocation } from './location';

@Component({
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit
{
  location: ILocation | undefined;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router: Router, private locationService: LocationService) { }

  ngOnInit()
  {
    const param = this.route.snapshot.paramMap.get('id');
    if (param)
    {
      const id = +param;
      this.getLocation(id);
    }
  }

  getLocation(id: number)
  {
    this.locationService.getLocation(id).subscribe(
      location => this.location = location,
      error => this.errorMessage = <any>error);
  }

  onBack(): void
  {
    this.router.navigate(['/products']);
  }
}
