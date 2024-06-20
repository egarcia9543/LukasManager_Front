export interface ExpenseDto {
  expense: Expense[]
}

export interface Expense {
  _id: string,
  user: string,
  description: string,
  amount: number,
  date: string,
  category: "Obligatory" | "Other" | "Savings"
}
