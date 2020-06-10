import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationListComponent } from './location-list.component';
//import { AgmCoreModule } from '@agm/core';
import { LocationDetailComponent } from './location-detail.component';
import { LocationDetailGuard } from './location-detail.guard';
import { RouteModule } from '../route/route.module';
import { SharedModule } from '../shared/shared.module';

@NgModule
  ({
    declarations: [LocationListComponent, LocationDetailComponent],
    imports:
      [
        CommonModule,
        RouterModule.forChild
          ([
            { path: 'locations', component: LocationListComponent },
            {
              path: 'locations/:id',
              canActivate: [LocationDetailGuard],
              component: LocationDetailComponent
            },
          ]),
        //AgmCoreModule.forRoot({ apiKey: 'AIzaSyD11s3QW5R_71Ywy8UmdJ6LhZlaVBPkawI' }),
        SharedModule,
        RouteModule
      ]
  })
export class LocationModule { }
