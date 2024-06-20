import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseDto } from '../../interfaces/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http: HttpClient
  ) { }

  getReportByDay(date: string, user_id: string): Observable<ExpenseDto> {
    return this.http.get<ExpenseDto>(`http://localhost:3000/get-expense?date=${date}&user=${user_id}`);
  }
}
