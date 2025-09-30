import { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/common/input';
import styles from '@/components/common/input/components/passwordInput/styles.module.scss';
import { passwordInputProps } from '@/components/common/input/components/passwordInput/types';
import ic_btn_visibility_on from '@/assets/icons/ic_btn_visibility_on.svg';
import ic_btn_visibility_off from '@/assets/icons/ic_btn_visibility_off.svg';
import clsx from 'clsx';

const PasswordInput = ({
  id,
  label,
  hasLabel,
  value,
  handleChange,
  handleBlur,
  errorMessage,
  placeholder,
}: passwordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={clsx(
        styles['password-wrapper'],
        hasLabel ? styles['has-label'] : styles['no-label'],
      )}
    >
      <Input
        id={id}
        label={label}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        errorMessage={errorMessage}
        type={visible ? 'text' : 'password'}
        autoComplete="password"
      />
      <button
        className={styles['password-toggle-btn']}
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        aria-pressed={visible}
        aria-label={visible ? '비밀번호 보기' : '비밀번호 숨기기'}
      >
        {visible ? (
          <Image
            src={ic_btn_visibility_on}
            alt="비밀번호 보이기"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={ic_btn_visibility_off}
            alt="비밀번호 숨기기"
            width={24}
            height={24}
          />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
