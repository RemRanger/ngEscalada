import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteListComponent } from './route-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule
  ({
    declarations: [RouteListComponent],
    imports: [CommonModule, SharedModule],
    exports: [RouteListComponent]
  })
export class RouteModule { }
