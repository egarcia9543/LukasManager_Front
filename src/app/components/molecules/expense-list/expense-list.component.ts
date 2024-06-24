import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Expense } from '../../../interfaces/expense.interface';
import { DialogComponent } from '../../atoms/dialog/dialog.component';

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
  @Output() expenseToDelete = new EventEmitter();
  constructor(
    private dialog: MatDialog,
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Eliminar gasto',
        content: '¿Estás seguro de que quieres eliminar este gasto?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseToDelete.emit(this.expense._id);
      }
    });
  }
}
