export interface ExpenseDto {
  expense: Expense[]
}

export interface Expense {
  _id: string,
  user: string,
  description: string,
  amount: number,
  date: string,
  category: string,
}

export interface MonthExpenses {
  expenses: Expense[],
  amount: number
}

export interface ExpenseToSaveDto {
  user_id: string;
  date: string;
  expenses: ExpenseToSave[];
}

export interface ExpenseToSave {
  amount: string;
  description: string;
  category: string;
}

export interface ServerResponse {
  message: string;
}

export interface ExpenseDialog {
  title: string;
  content: string;
}
