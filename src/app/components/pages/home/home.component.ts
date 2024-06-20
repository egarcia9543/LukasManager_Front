import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputCalendarComponent } from '../../atoms/input-calendar/input-calendar.component';
import { ReportsService } from '../../../services/report/reports.service';
import { UserService } from '../../../services/user/user.service';
import { Expense } from '../../../interfaces/expense.interface';
import { LoaderComponent } from '../../atoms/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputCalendarComponent,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public currentDate = new Date();
  public dailyExpenses: Expense[] = [];
  public loading: boolean = false;

  public reportFilter: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });

  constructor(
    private reportsService: ReportsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.reportFilter.get('date')?.setValue(this.currentDate);
  }

  getExpenseReport() {
    this.loading = true;
    const user_id = this.userService.getUserInSessionId();
    const date = this.formatDate();
    this.reportsService.getReportByDay(date, user_id).subscribe((response) => {
      this.dailyExpenses = response.expense;
      this.loading = false;
    });
  }

  formatDate(): string {
    return this.reportFilter.get('date')?.value.toISOString().split('T')[0];
  }
}
