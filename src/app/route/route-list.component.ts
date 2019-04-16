import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from './route.service';
import { IRoute } from './route';
import { Utils } from '../shared/utils';

@Component({
  selector: 'esc-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit
{
  @Input() locationId: number;
  routes: IRoute[] = [];
  errorMessage = '';
  resultPic: string;

  constructor(private routeService: RouteService) { }

  ngOnInit()
  {
    this.routeService.getRoutes(this.locationId).subscribe
      (
        routes => this.routes = routes.filter(r => r.dateUntil == null),
        error => this.errorMessage = <any>error
      );
  }

  getResultPic(result: number): string { return Utils.getResultPic(result); }

  getApiUrl(): string { return this.routeService.apiUrl; }
}
