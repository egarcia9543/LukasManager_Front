import { Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    LoaderComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loading: boolean = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private userSrv: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  public login(): void {
    this.loading = true;
    if (this.loginForm.valid) {
      this.userSrv.signin(this.loginForm.value).subscribe(
        (user) => {
          this.loading = false;
          sessionStorage.setItem('user', JSON.stringify(user.user));
          this.router.navigate(['/dashboard']);
        }, (err: HttpErrorResponse) => {
          const {error: {error}} = err;
          this.loading = false;
          this.snackBar.open(error, 'Cerrar', {
            duration: 6000
          });
        }
      );
    };
  };
}
