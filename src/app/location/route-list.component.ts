import { Component, OnInit, Input } from '@angular/core';
import { RouteService } from './route.service';
import { IRoute } from './route';

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

  getResultPic(route: IRoute): string
  {
    switch (route.result)
    {
      case 0: return "result-fail.png";
      case 1: return"result-faults.png";
      case 2: return"result-success.png";
      default: return null;
    }
  }
}
