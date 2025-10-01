import { ChangePasswordRequest } from '@/types/user';

export interface FormState {
  currentPassword: string;
  newPassword: string;
  verifyNewPassword: string;
  [key: string]: string | undefined;
}
export interface ErrorState extends Record<string, string | undefined> {
  currentPassword?: string;
  newPassword?: string;
  verifyNewPassword?: string;
}

export interface ChangePasswordInputProps {
  onChangePassword: (requestData: ChangePasswordRequest) => Promise<boolean>;
}
