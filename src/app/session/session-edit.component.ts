import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location/location.service';
import { ILocation } from '../location/location';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from './session.service';
import { Session } from './session';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.css']
})
export class SessionEditComponent implements OnInit
{
  session: Session;
  userId: number;
  locations: ILocation[] = [];
  users: User[] = [];
  errorMessage = '';
  response: any;

  constructor(private location: Location, private route: ActivatedRoute, private sessionService: SessionService, private locationService: LocationService, private userService: UserService)
  {
    const paramId = this.route.snapshot.paramMap.get('id');
    const paramUserId = this.route.snapshot.paramMap.get('userId');

    if (paramUserId)
      this.userId = +paramUserId;
    if (paramId && paramUserId)
    {
      const id = +paramId;
      if (id > 0)
      {
        this.sessionService.getSession(id, this.userId).subscribe
          (
            session =>
            {
              this.session = session;
              this.session.partnerIds = this.getMateIdArray(this.session.partnerIdsAsString);
            },
            error => this.errorMessage = <any>error
          );
      }
      else
      {
        this.session = new Session();
        this.session.date = new Date();
      }

      this.userService.getUsers().subscribe
        (
          users => this.users = users,
          error => this.errorMessage = <any>error
        );
    }

    this.locationService.getLocations().subscribe
      (
        locations => this.locations = locations,
        error => this.errorMessage = <any>error
      );
  }

  ngOnInit()
  {
  }

  submit(sessionEditForm: NgForm)
  {
    console.log(sessionEditForm.form);
    console.log('Edit session: ' + JSON.stringify(this.session));
    console.log('Form value: ' + JSON.stringify(sessionEditForm.value));
    this.sessionService.saveSession(this.session, this.userId).subscribe
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

  private getMateIdArray(mateIds: string): number[]
  {
    let ids: number[] = [];

    let idStrings: string[] = mateIds.toString().split(",");
    for (let idString of idStrings)
      ids.push(+idString);

    return ids;
  }
}
