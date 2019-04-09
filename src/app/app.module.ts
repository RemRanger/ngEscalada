import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ClimberModule } from './climber/climber.module';
import { LocationModule } from './location/location.module';
import { AboutComponent } from './home/about.component';
import { ActivityListComponent } from './home/activity-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ActivityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot
      ([
        { path: 'home', component: HomeComponent },
        { path: 'about', component: AboutComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: '**', redirectTo: 'home', pathMatch: 'full' }
      ]),
    LocationModule,
    ClimberModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
