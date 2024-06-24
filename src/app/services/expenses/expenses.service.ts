import { environment } from './../../../environments/environments.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseDto, ExpenseToSaveDto, MonthExpenses, ServerResponse } from '../../interfaces/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  baseUrl = environment.backUrl;
  constructor(
    private http: HttpClient
  ) { }

  getExpensesByDay(date: string, user_id: string): Observable<ExpenseDto> {
    return this.http.get<ExpenseDto>(`${this.baseUrl}get-expense?date=${date}&user=${user_id}`);
  }

  saveExpenses(expenses: ExpenseToSaveDto): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.baseUrl}save-expense`, expenses);
  }

  deleteExpense(expense_id: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.baseUrl}delete-expense?expense_id=${expense_id}`);
  }

  getMonthlyExpenses(date: string, user_id: string): Observable<MonthExpenses> {
    return this.http.get<MonthExpenses>(`${this.baseUrl}get-expenses-by-month?date=${date}&user=${user_id}`);
  }
}
