import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseDto, ExpenseToSaveDto, SavedExpenseDto } from '../../interfaces/expense.interface';

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

  saveExpenses(expenses: ExpenseToSaveDto): Observable<SavedExpenseDto> {
    return this.http.post<SavedExpenseDto>('http://localhost:3000/save-expense', expenses);
  }
}
