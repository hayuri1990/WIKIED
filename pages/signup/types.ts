export interface FormState {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export interface ErrorState {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirmation?: string;
}
