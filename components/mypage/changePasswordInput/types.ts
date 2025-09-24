import { ChangePasswordRequest } from '@/types/user';

export interface FormState {
  currentPassword: string;
  newPassword: string;
  verifyNewPassword: string;
}

export interface ErrorState {
  currentPassword?: string;
  newPassword?: string;
  verifyNewPassword?: string;
}

export interface ChangePasswordInputProps {
  onChangePassword: (requestData: ChangePasswordRequest) => Promise<boolean>;
}
