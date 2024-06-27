import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Categories } from '../../../constants/categories.constants';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { InputCalendarComponent } from '../../components/atoms/input-calendar/input-calendar.component';
import { InputSelectComponent } from '../../components/atoms/input-select/input-select.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { PaymentService } from '../../services/payments/payment.service';
import { UserService } from '../../services/user/user.service';
import { ExpenseListComponent } from '../../components/molecules/expense-list/expense-list.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputCalendarComponent,
    InputComponent,
    ButtonComponent,
    InputSelectComponent,
    LoaderComponent,
    MatIconModule,
    MatDividerModule,
    ExpenseListComponent,
    CurrencyPipe
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  public categories = Categories
  public userPayments: any[] = [];
  public userPaymentsAmount: number = 0;
  public loading: boolean = false;
  private user_id: string = '';

  constructor(
    private paymentSrv: PaymentService,
    private userSrv: UserService
  ) { }

  public paymentsForm: FormGroup = new FormGroup({
    payments: new FormArray([])
  });

  ngOnInit() {
    this.loading = true;
    this.user_id = this.userSrv.getUserInSessionId();
    this.getUserPayments();
  }

  getUserPayments() {
    this.paymentSrv.getPayments(this.user_id).subscribe(res => {
      this.userPayments = res.payments;
      this.userPaymentsAmount = res.totalPayments;
      this.loading = false;
    });
  }

  addPayment() {
    (this.paymentsForm.get('payments') as FormArray).push(new FormGroup({
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      paymentDay: new FormControl('', [Validators.required])
    }));
  }

  removePayment(index: number) {
    (this.paymentsForm.get('payments') as FormArray).removeAt(index);
  }

  submitPayments() {
    this.loading = true;
    if (this.paymentsForm.valid) {
      this.paymentSrv.savePayments(this.user_id, this.paymentsForm.value.payments).subscribe(res => {
        this.getUserPayments();
        this.loading = false;
      })
    }
  }

  deletePayment(payment_id: string) {
    this.loading = true;
    this.paymentSrv.deletePayment(payment_id).subscribe(res => {
      this.getUserPayments();
      this.loading = false;
    })
  }

  get payments() {
    return this.paymentsForm.get('payments') as FormArray;
  }
}
