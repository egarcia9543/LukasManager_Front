import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
    if (!this.user) {
      this.router.navigate(['/sign-up']);
    }
    this.userName = this.user.fullName;
    console.log(this.user);
  }

}
