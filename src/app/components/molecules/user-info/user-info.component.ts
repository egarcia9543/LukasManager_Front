import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    MatIconModule,
    InitialsPipe,
    CommonModule
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  public user: User = {} as User;
  constructor(
    private userSrv: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.userSrv.getUserInSession();
  }

  public logout(): void {
    this.userSrv.logout();
  }
}
