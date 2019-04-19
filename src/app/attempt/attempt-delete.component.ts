import { Component, OnInit } from '@angular/core';
import { Attempt } from './attempt';
import { ActivatedRoute } from '@angular/router';
import { AttemptService } from './attempt.service';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-attempt-delete',
  templateUrl: './attempt-delete.component.html',
  styleUrls: ['./attempt-delete.component.css']
})
export class AttemptDeleteComponent implements OnInit
{
  attempt: Attempt;
  userId: number;
  errorMessage = '';
  response: any;

  constructor(private location: Location, private route: ActivatedRoute, private attemptService: AttemptService)
  {
    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId)
    {
      const id = +paramId;
      if (id > 0)
      {
        this.attemptService.getAttempt(id).subscribe
          (
            attempts => this.attempt = attempts[0],
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
    console.log('Delete attempt: ' + JSON.stringify(this.attempt));
    this.attemptService.deleteAttempt(this.attempt).subscribe
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
