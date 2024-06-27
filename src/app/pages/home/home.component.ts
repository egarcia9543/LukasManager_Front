import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { InputCalendarComponent } from '../../components/atoms/input-calendar/input-calendar.component';
import { InputSelectComponent } from '../../components/atoms/input-select/input-select.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { ExpenseListComponent } from '../../components/molecules/expense-list/expense-list.component';
import { Expense } from '../../interfaces/expense.interface';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { UserService } from '../../services/user/user.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Categories } from '../../../constants/categories.constants';


@Component({
  selector: 'app-home',
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
    ExpenseListComponent,
    MatProgressBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public currentDate = new Date();
  public isToday: boolean = true;
  public dailyExpenses: Expense[] = [];
  public loading: boolean = false;
  public categories: string[] = Categories;
  public canSaveForm: boolean = false;
  public totalOfTheDay: number = 0;
  public totalOfTheMonth: number = 0;
  public totalExpenses: any = [];
  public averageSpended: number = 0;

  public reportFilter: FormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });

  public expenseForm: FormGroup = new FormGroup({
    expenses: new FormArray([])
  });

  constructor(
    private expensesSrv: ExpensesService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.reportFilter.patchValue({ date: this.currentDate });
    this.getExpenseReport();
  }

  getExpenseReport() {
    this.loading = true;
    const user_id = this.userService.getUserInSessionId();
    const date = this.formatDate(this.reportFilter.controls['date'].value);
    this.expensesSrv.getExpensesByDay(date, user_id).subscribe((response) => {
      this.dailyExpenses = response.expense;
      this.calcTotalAmoutOfExpenses(response.expense);
      this.loading = false;
    });

    if(date == this.formatDate(this.currentDate)) {
      this.isToday = true;
      this.getMonthExpenses();
    } else {
      this.isToday = false;
    }
  }

  formatDate(date: Date): string {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
  }

  calcTotalAmoutOfExpenses(expenses: Expense[]) {
    this.totalOfTheDay = 0;
    expenses.forEach((expense) => {
      if (expense.category !== 'Ahorro') {
        this.totalOfTheDay += expense.amount;
      }
    });
  }

  get expenses() {
    return this.expenseForm.get('expenses') as FormArray;
  }

  addExpense() {
    this.expenses.push(new FormGroup({
      amount: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    }));
  }

  removeExpense(index: number) {
    this.expenses.removeAt(index);
  }

  submitExpenses() {
    if (this.expenseForm.valid) {
      this.loading = true;
      const user_id = this.userService.getUserInSessionId();
      const date = this.formatDate(this.reportFilter.controls['date'].value);

      const body = {
        user_id,
        date,
        expenses: this.expenseForm.value.expenses
      };

      this.expensesSrv.saveExpenses(body).subscribe((response) => {
        this.snackBar.open(response.message, 'Cerrar', {
          duration: 6000
        });
        this.expenses.clear();
        this.getExpenseReport();
        this.loading = false;
      });
    }
  }

  deleteExpense(expense_id: string) {
    this.loading = true;
    this.expensesSrv.deleteExpense(expense_id).subscribe((response) => {
      this.snackBar.open(response.message, 'Cerrar', {
        duration: 6000
      });
      this.getExpenseReport();
      this.loading = false;
    });
  }

  getMonthExpenses() {
    const user_id = this.userService.getUserInSessionId();
    const date = this.formatDate(this.currentDate);
    this.expensesSrv.getMonthlyExpenses(date, user_id).subscribe((response) => {
      this.totalExpenses = response.expenses.map(expense => ({ name: expense.category, value: expense.amount }));
      this.totalOfTheMonth = response.amount;
      this.calcAverageSpended();
    });
  }

  calcAverageSpended() {
    const salary = this.userService.getUserInSession().salary;
    this.averageSpended = (this.totalOfTheMonth / salary) * 100;
  }
}
