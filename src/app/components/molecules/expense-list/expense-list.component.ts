import { Component, Input } from '@angular/core';
import { Expense } from '../../../interfaces/expense.interface';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    MatIconModule,
    CurrencyPipe
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
  @Input() expense!: Expense;
}
