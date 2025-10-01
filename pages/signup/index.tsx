import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { publicAxiosInstance } from '@/services/api/axiosInstance';
import styles from '@/pages/signup/styles.module.scss';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import Toast from '@/components/common/toast';
import PasswordInput from '@/components/common/input/components/passwordInput';
import { SignUpFormDataType, signUpErrorState } from '@/types/auth';
import { usePasswordValidation } from '@/hooks/usePasswordValidation/usePasswordValidation';
import { useForm } from '@/hooks/useForm/useForm';
import { withValidation } from '@/utils/formUtils';

const SignupPage = () => {
  const [formState, setFormState] = useState<SignUpFormDataType>({
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState<signUpErrorState>({});
  const router = useRouter();

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({
    message: '',
    type: 'success',
    visible: false,
  });

  const handleCloseToast = () => {
    setToast((prevState) => ({ ...prevState, visible: false }));
  };

  // 비밀번호 유효성 검사
  usePasswordValidation({
    formState,
    setErrors,
    fields: ['password', 'passwordConfirmation'],
  });

  const { handleChange, handleBlur, validateForm } =
    useForm<SignUpFormDataType>({
      formState,
      setFormState,
      setErrors,
      passwordFieldKey: 'password',
      fields: ['email', 'name', 'password', 'passwordConfirmation'],
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    withValidation(validateForm, [
      'email',
      'name',
      'password',
      'passwordConfirmation',
    ])(async () => {
      try {
        const response = await publicAxiosInstance.post('/auth/signUp', {
          email: formState.email,
          name: formState.name,
          password: formState.password,
          passwordConfirmation: formState.passwordConfirmation,
        });
        alert('성공적으로 회원가입 되었어요 😃');
        router.push('/login');
        console.log('회원가입 성공:', response.data);
      } catch (error) {
        setToast({
          message: `회원가입에 실패했습니다. #이름 & 이메일 & 비밀번호#를 다시 확인 해주세요 🙁`,
          type: 'error',
          visible: true,
        });
        console.error('회원가입 실패:', error);
      }
    });
  };

  return (
    <div className={styles['signup-container']}>
      <p className={styles['title']}>회원가입</p>
      <form
        className={styles['form']}
        id="signupForm"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className={styles['input-wrapper']}>
          <Input
            id="name"
            label="이름"
            value={formState.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="이름을 입력해 주세요"
            errorMessage={errors.name}
            autoComplete="name"
          />
          <Input
            id="email"
            label="이메일"
            value={formState.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="이메일을 입력해 주세요"
            errorMessage={errors.email}
            autoComplete="email"
          />
          <PasswordInput
            id="password"
            label="비밀번호"
            hasLabel
            value={formState.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errorMessage={errors.password}
            placeholder="비밀번호를 입력해 주세요"
          />
          <PasswordInput
            id="passwordConfirmation"
            label="비밀번호 확인"
            hasLabel
            value={formState.passwordConfirmation}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errorMessage={errors.passwordConfirmation}
            placeholder="비밀번호를 입력해 주세요"
          />
        </div>
        <Button color="primary" size="large">
          가입하기
        </Button>
      </form>
      <div className={styles['logon-wrapper']}>
        <strong>이미 회원이신가요?</strong>
        <Link className={styles['login']} href="/login">
          로그인하기
        </Link>
      </div>
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default SignupPage;
