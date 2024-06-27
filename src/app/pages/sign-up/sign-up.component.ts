import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { catchError, debounceTime } from 'rxjs';

import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/atoms/input/input.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    LoaderComponent,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public loading: boolean = false;
  public suggestions: number[] = [];

  public signUpForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    mandatoryExpenses: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    otherExpenses: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    savings: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
  });

  constructor(
    private userSrv: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.signUpForm.get('salary')?.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(() => {
      this.suggestPercentages();
    });
  }

  public signUp(): void {
    this.loading = true;
    if (this.signUpForm.valid) {
      this.userSrv.registerUser(this.signUpForm.value).pipe(
        catchError((err: HttpErrorResponse) => {
          const { error: { error } } = err;
          this.loading = false;
          this.snackBar.open(error, 'Cerrar', {
            duration: 6000
          });
          throw Error(error);
        })
      )
        .subscribe((user) => {
          this.loading = false;
          sessionStorage.setItem('user', JSON.stringify(user.user));
          this.router.navigate(['/dashboard']);
        });
    }
  }

  public suggestPercentages(): void {
    const salary = this.signUpForm.get('salary')?.value;
    if(!salary) {
      this.suggestions = [];
      return;
    };

    const mandatoryExpenses = salary * 0.5;
    const otherExpenses = salary * 0.3;
    const savings = salary * 0.2;
    this.suggestions = [mandatoryExpenses, otherExpenses, savings];
  }
}
