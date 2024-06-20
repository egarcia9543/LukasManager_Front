export interface UserResponseDto {
  user: User;
};

export interface User {
  _id: string,
  fullName: string,
  email: string,
  password: string,
  salary: number,
  mandatoryExpenses: number,
  otherExpenses: number,
  savings: number
  reports?: [{}]
};

export interface UserCredentials {
  email: string,
  password: string,
}


