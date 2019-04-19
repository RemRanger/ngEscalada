import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from './session.service';
import { Session } from './session';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-session-delete',
  templateUrl: './session-delete.component.html',
  styleUrls: ['./session-delete.component.css']
})
export class SessionDeleteComponent implements OnInit
{
  session: Session;
  userId: number;
  errorMessage = '';
  response: any;

  constructor(private location: Location, private route: ActivatedRoute, private sessionService: SessionService)
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
            },
            error => this.errorMessage = <any>error
          );
      }
    }
  }

  ngOnInit()
  {
  }

  submit(sessionDeleteForm: NgForm)
  {
    console.log(sessionDeleteForm.form);
    console.log('Delete session: ' + JSON.stringify(this.session));
    this.sessionService.deleteSession(this.session).subscribe
      (
        response =>
        {
          this.response = response;
          console.log(this.response);
          if (this.response.id > 0)
          {
            console.log("Success: session id =", this.response.id, "has been deleted.");
            this.location.back();
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
