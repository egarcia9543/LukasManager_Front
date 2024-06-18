export interface UserResponseDto {
  user: User;
};

export interface User {
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


