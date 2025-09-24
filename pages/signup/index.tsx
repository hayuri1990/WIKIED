import { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import styles from '@/pages/signup/styles.module.scss';
import Link from 'next/link';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { SignupInputId, getErrorMessage } from '@/types/authUtils';
import { FormState, ErrorState } from '@/pages/signup/types';
import useDebounce from '@/hooks/useDebounce/useDebounce';
import { publicAxiosInstance } from '@/services/api/axiosInstance';
import { useRouter } from 'next/router';
import Toast from '@/components/common/toast';

const SignupPage = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState<ErrorState>({});
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

  const debouncedPassword = useDebounce(formState.password, 500);
  const debouncedPasswordConfirmation = useDebounce(
    formState.passwordConfirmation,
    500,
  );

  useEffect(() => {
    if (debouncedPassword || debouncedPasswordConfirmation) {
      const passwordError = getErrorMessage('password', debouncedPassword);
      const passwordConfirmationError = getErrorMessage(
        'passwordConfirmation',
        debouncedPasswordConfirmation,
        debouncedPassword,
      );

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
        passwordConfirmation: passwordConfirmationError,
      }));
    }
  }, [debouncedPassword, debouncedPasswordConfirmation]);

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
      id as SignupInputId,
      value,
      formState.password,
    );
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: getErrorMessage('email', formState.email),
      name: getErrorMessage('name', formState.name),
      password: getErrorMessage('password', formState.password),
      passwordConfirmation: getErrorMessage(
        'passwordConfirmation',
        formState.passwordConfirmation,
        formState.password,
      ),
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);

    if (isValid) {
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
    }
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
          ></Input>

          <Input
            id="email"
            label="이메일"
            value={formState.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="이메일을 입력해 주세요"
            errorMessage={errors.email}
          ></Input>
          <Input
            className={styles['password-input']}
            id="password"
            label="비밀번호"
            value={formState.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="비밀번호를 입력해 주세요"
            errorMessage={errors.password}
            type="password"
          ></Input>
          <Input
            id="passwordConfirmation"
            label="비밀번호 확인"
            value={formState.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="비밀번호를 입력해 주세요"
            errorMessage={errors.passwordConfirmation}
            type="password"
          ></Input>
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
