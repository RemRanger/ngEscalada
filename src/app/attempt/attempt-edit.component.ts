import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttemptService } from './attempt.service';
import { Attempt } from './attempt';
import { RouteService } from '../route/route.service';
import { IRoute } from '../route/route';
import { SessionService } from '../session/session.service';
import { Session } from '../session/session';

@Component({
  selector: 'app-attempt-edit',
  templateUrl: './attempt-edit.component.html',
  styleUrls: ['./attempt-edit.component.css']
})
export class AttemptEditComponent implements OnInit
{
  attempt: Attempt;
  session: Session;
  routes: IRoute[];
  errorMessage = '';
  percentages: number[] = [];

  constructor(private route: ActivatedRoute, private attemptService: AttemptService, private sessionService: SessionService, private routeService: RouteService)
  {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId)
    {
      const id = +paramId;
      if (id > 0)
      {
        this.attemptService.getAttempt(id).subscribe
          (
            attempts =>
            {
              this.attempt = attempts[0];
              this.routeService.getRoutes(this.attempt.locationId).subscribe
                (
                  routes => this.routes = routes,
                  error => this.errorMessage = <any>error
                );
            },
            error => this.errorMessage = <any>error
          );

        console.log("Attempt", this.attempt);

      }
      else
      {
        const paramSessionId = this.route.snapshot.paramMap.get('sessionId');
        if (paramSessionId)
        {
          const sessionId = +paramSessionId;
          this.sessionService.getSingleSession(sessionId).subscribe
            (
              sessions =>
              {
                this.session = sessions[0];
                console.log("Session:", this.session);
                console.log("Session's locationId:", this.session.locationId);
                this.routeService.getRoutes(this.session.locationId).subscribe
                  (
                    routes => this.routes = routes,
                    error => this.errorMessage = <any>error
                  );

                this.attempt = new Attempt();
                this.attempt.sessionDate = this.session.date;
                this.attempt.locationName = this.session.locationName;

              },
              error => this.errorMessage = <any>error
            );

        }
      }
    }


    for (var p = 0; p <= 95; p += 5)
      this.percentages.push(p);
  }

  ngOnInit()
  {
  }
}
