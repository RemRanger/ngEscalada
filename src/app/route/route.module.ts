import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteListComponent } from './route-list.component';

@NgModule
  ({
    declarations: [RouteListComponent],
    imports: [CommonModule],
    exports: [RouteListComponent]
  })
export class RouteModule { }
