import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseDto, ExpenseToSaveDto, MonthExpenses, ServerResponse } from '../../interfaces/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(
    private http: HttpClient
  ) { }

  getExpensesByDay(date: string, user_id: string): Observable<ExpenseDto> {
    return this.http.get<ExpenseDto>(`http://localhost:3000/get-expense?date=${date}&user=${user_id}`);
  }

  saveExpenses(expenses: ExpenseToSaveDto): Observable<ServerResponse> {
    return this.http.post<ServerResponse>('http://localhost:3000/save-expense', expenses);
  }

  deleteExpense(expense_id: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`http://localhost:3000/delete-expense?expense_id=${expense_id}`);
  }

  getMonthlyExpenses(date: string, user_id: string): Observable<MonthExpenses> {
    return this.http.get<MonthExpenses>(`http://localhost:3000/get-expenses-by-month?date=${date}&user=${user_id}`);
  }
}
