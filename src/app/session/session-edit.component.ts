import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location/location.service';
import { ILocation } from '../location/location';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from './session.service';
import { Session } from './session';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.css']
})
export class SessionEditComponent implements OnInit
{
  session: Session;
  locations: ILocation[] = [];
  users: User[] = [];
  errorMessage = '';

  constructor(private route: ActivatedRoute, private sessionService: SessionService, private locationService: LocationService, private userService: UserService)
  {
    const paramId = this.route.snapshot.paramMap.get('id');
    const paramUserId = this.route.snapshot.paramMap.get('userId');
    if (paramId && paramUserId)
    {
      const id = +paramId;
      const userId = +paramUserId;
      if (id > 0)
      {
        this.sessionService.getSession(id, userId).subscribe
          (
            session => this.session = session,
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

  hasMate(userId: number): boolean
  {
    let mateIdArray: string[] = this.session.mateIds.toString().split(",");
    return mateIdArray.indexOf(userId.toString()) >= 0;
  }
}
