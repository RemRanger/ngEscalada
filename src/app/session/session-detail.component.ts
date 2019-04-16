import { Component, OnInit } from '@angular/core';
import { ISession } from './session';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './session.service';
import { User } from '../user/user';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit
{
  session: ISession | undefined;
  user: User;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService) { }

  ngOnInit()
  {
    const param = this.route.snapshot.paramMap.get('id');
    if (param)
    {
      const id = +param;
      this.getSession(id);
    }

    this.user = Utils.getUser();
  }

  getSession(id: number)
  {
    this.sessionService.getSession(id).subscribe
    (
      session => this.session = session,
      error => this.errorMessage = <any>error);
  }

  onBack(): void
  {
    this.router.navigate(['/sessions']);
  }
}
