import { Component } from '@angular/core';
import { ExpenseGraphComponent } from '../../components/molecules/expense-graph/expense-graph.component';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    ExpenseGraphComponent,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  public date = new Date();
  constructor(
    private expensesSrv: ExpensesService,
    private userSrv: UserService
  ) { }

  totalExpenses: any[] = [];

  ngOnInit() {
    this.getTotalExpensesOfTheMonth();
  }

  getTotalExpensesOfTheMonth() {
    const user_id = this.userSrv.getUserInSessionId()
    const date = this.formatDate(this.date)
    this.expensesSrv.getMonthlyExpenses(date, user_id).subscribe(response => {
      this.totalExpenses = response.expenses.map(expense => ({name: expense.category, value: expense.amount}));
    });
  };

  formatDate(date: Date): string {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
  };
}
