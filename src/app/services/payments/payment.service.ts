import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = environment.backUrl
  constructor(
    private http: HttpClient
  ) { }


  savePayments(user_id: string, payments: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}save-payments`, { user_id, payments });
  }

  getPayments(user_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}get-payments/?user_id=${user_id}`);
  }

  deletePayment(payment_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}delete-payment/?payment_id=${payment_id}`);
  }
}
