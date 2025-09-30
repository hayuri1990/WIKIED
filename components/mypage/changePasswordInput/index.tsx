import { useState, ChangeEvent, FocusEvent } from 'react';
import Button from '@/components/common/button';
import styles from '@/components/mypage/changePasswordInput/styles.module.scss';
import {
  FormState,
  ErrorState,
  ChangePasswordInputProps,
} from '@/components/mypage/changePasswordInput/types';
import Toast from '@/components/common/toast';
import PasswordInput from '@/components/common/input/components/passwordInput';
import { ChangePasswordRequest } from '@/types/user';
import { usePasswordValidation } from '@/hooks/usePasswordValidation/usePasswordValidation';
import { ChangePasswordInputId, getErrorMessage } from '@/types/authUtils';

const ChangePasswordInput = ({
  onChangePassword,
}: ChangePasswordInputProps) => {
  const [formState, setFormState] = useState<FormState>({
    currentPassword: '',
    newPassword: '',
    verifyNewPassword: '',
  });

  const [errors, setErrors] = useState<ErrorState>({});
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // 비밀번호 유효성 검사
  usePasswordValidation({
    formState,
    setErrors,
    fields: ['currentPassword', 'newPasswordError', 'verifyNewPasswordError'],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    const errorMessage = getErrorMessage(
      id as ChangePasswordInputId,
      value,
      formState.newPassword,
    );
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formState.currentPassword === formState.newPassword) {
      setToastMessage('현재 비밀번호와 동일합니다.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const requestData: ChangePasswordRequest = {
      currentPassword: formState.currentPassword,
      password: formState.newPassword,
      passwordConfirmation: formState.verifyNewPassword,
    };

    try {
      const success = await onChangePassword(requestData);

      if (success) {
        setToastMessage('비밀번호 변경이 완료되었습니다 😃');
        setToastType('success');
      } else {
        setToastMessage('비밀번호 변경에 실패했어요 🥲');
        setToastType('error');
      }
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
      setToastMessage('비밀번호 변경에 실패했어요 🥲');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  return (
    <form className={styles['container']} onSubmit={handleSubmit}>
      <div className={styles['pwd-input-wrapper']}>
        <PasswordInput
          id="currentPassword"
          label="비밀번호 변경"
          hasLabel
          value={formState.currentPassword}
          handleChange={handleChange}
          errorMessage={errors.currentPassword}
          placeholder="기존 비밀번호"
        />
        <PasswordInput
          id="newPassword"
          hasLabel={false}
          value={formState.newPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errorMessage={errors.newPassword}
          placeholder="새 비밀번호"
        />
        <PasswordInput
          id="verifyNewPassword"
          hasLabel={false}
          value={formState.verifyNewPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errorMessage={errors.verifyNewPassword}
          placeholder="새 비밀번호 확인"
        />
      </div>
      <Button color="primary" size="small" alignEnd defaultPadding>
        변경하기
      </Button>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </form>
  );
};

export default ChangePasswordInput;
