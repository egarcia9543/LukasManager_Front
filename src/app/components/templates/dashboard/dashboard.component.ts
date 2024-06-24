import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { SidebarComponent } from '../../molecules/sidebar/sidebar.component';
import { UserInfoComponent } from '../../molecules/user-info/user-info.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SidebarComponent,
    UserInfoComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public user: User = {} as User;
  public userName: string = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') ?? '');
    this.userName = this.user.fullName;
  }

}
