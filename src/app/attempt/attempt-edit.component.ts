import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttemptService } from './attempt.service';
import { Attempt } from './attempt';
import { RouteService } from '../route/route.service';
import { IRoute } from '../route/route';
import { SessionService } from '../session/session.service';
import { Session } from '../session/session';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Utils } from '../shared/utils';
import { UserService } from '../user/user.service';

@Component(
  {
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
  response: any;

  constructor(private location: Location, private route: ActivatedRoute, private attemptService: AttemptService, private sessionService: SessionService, private userService: UserService, private routeService: RouteService)
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
              this.sessionService.getSingleSession(this.attempt.sessionId).subscribe
                (
                  sessions =>
                  {
                    this.session = sessions[0];
                    this.routeService.getRoutes(this.attempt.locationId).subscribe
                      (
                        routes => this.routes = routes.filter(r => r.dateFrom <= this.session.date && (r.dateUntil == null || r.dateUntil >= this.session.date)),
                        error => this.errorMessage = <any>error
                      );
                  }
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
                    routes => this.routes = routes.filter(r => r.dateFrom <= this.session.date && (r.dateUntil == null || r.dateUntil >= this.session.date)),
                    error => this.errorMessage = <any>error
                  );

                this.attempt = new Attempt();
                this.attempt.sessionId = this.session.id;
                this.attempt.sessionDate = this.session.date;
                this.attempt.locationId = this.session.locationId;
                this.attempt.locationName = this.session.locationName;
                this.attempt.userId = this.userService.getCurrentUserId();
                this.attempt.result = 0;
                this.attempt.percentage = 0;
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

  submit(attemptEditForm: NgForm)
  {
    console.log(attemptEditForm.form);
    console.log('Edit attempt: ' + JSON.stringify(this.attempt));
    console.log('Form value: ' + JSON.stringify(attemptEditForm.value));
    this.attemptService.saveAttempt(this.attempt).subscribe
      (
        response =>
        {
          this.response = response;
          console.log(this.response);
          if (this.response.id > 0)
          {
            console.log("Success: new session id =", this.response.id);
            this.location.back();
          }
          else
          {
            console.log("Failure: could not create new user: ", this.response);
          }
        },
        error =>
        {
          this.errorMessage = <any>error;
          console.log("POST call in error", error);
        }
        ,
        () =>
        {
          console.log("The POST observable is now completed. response = ", this.response);
        }
      );
  }
}
