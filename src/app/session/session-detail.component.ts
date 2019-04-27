import { Component, OnInit } from '@angular/core';
import { Session } from './session';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './session.service';
import { User } from '../user/user';
import { Utils } from '../shared/utils';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit
{
  session: Session | undefined;
  user: User;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router: Router, private sessionService: SessionService, private userService: UserService) { }

  ngOnInit()
  {
    const paramId = this.route.snapshot.paramMap.get('id');
    const paramUserId = this.route.snapshot.paramMap.get('userId');
    if (paramId && paramUserId)
    {
      const id = +paramId;
      const userId = +paramUserId;
      this.getSession(id, userId);
      this.getUser(userId)
    }
  }

  getSession(id: number, userId: number)
  {
    this.sessionService.getSession(id, userId).subscribe
      (
        sessions => this.session = sessions[0],
        error => this.errorMessage = <any>error);
  }

  getUser(userId: number)
  {
    this.userService.getUser(userId).subscribe
      (
        user => this.user = user,
        error => this.errorMessage = <any>error);
  }

  onBack(): void
  {
    this.router.navigate(['/home']);
  }
}
