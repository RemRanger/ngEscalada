import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationListComponent } from './location-list.component';
import { AgmCoreModule } from '@agm/core';

@NgModule
  ({
    declarations: [LocationListComponent],
    imports:
      [
        CommonModule,
        RouterModule.forChild
          ([
            { path: 'locations', component: LocationListComponent }
            //,
            //{
            //  path: 'products/:id',
            //  canActivate: [LocationDetailGuard],
            //  component: LocationDetailComponent
            //},
          ]),
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyD11s3QW5R_71Ywy8UmdJ6LhZlaVBPkawI' })
      ]
  })
export class LocationModule { }
