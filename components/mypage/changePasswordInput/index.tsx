import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { useForm } from '@/hooks/useForm/useForm';
import { ChangePasswordFormDataType } from '@/types/auth';
import { withValidation } from '@/utils/formUtils';

const ChangePasswordInput = ({
  onChangePassword,
}: ChangePasswordInputProps) => {
  const router = useRouter();

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

  const { handleChange, handleBlur, validateForm } =
    useForm<ChangePasswordFormDataType>({
      formState,
      setFormState,
      setErrors,
      passwordFieldKey: 'newPassword',
      fields: ['currentPassword', 'newPassword', 'verifyNewPassword'],
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.currentPassword === formState.newPassword) {
      setToastMessage('현재 비밀번호와 동일합니다.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    withValidation(validateForm, [
      'currentPassword',
      'newPassword',
      'verifyNewPassword',
    ])(async () => {
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
          setTimeout(() => {
            router.push('/');
          }, 2000);
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
    });
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
