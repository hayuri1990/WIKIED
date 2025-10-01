import { useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce/useDebounce';
import { getErrorMessage, UsePasswordValidationProps } from '@/types/authUtils';

export const usePasswordValidation = <
  T extends Record<string, string | undefined>,
>({
  formState,
  setErrors,
  fields,
}: UsePasswordValidationProps<T>) => {
  const debouncedValues = fields.reduce(
    (acc, field) => {
      acc[field] = useDebounce(formState[field] ?? '', 500);
      return acc;
    },
    {} as Record<keyof T, string>,
  );

  useEffect(() => {
    fields.forEach((field) => {
      if (debouncedValues[field] !== '' && formState[field] !== '') {
        const errorMessage =
          field === 'passwordConfirmation'
            ? getErrorMessage(
                'passwordConfirmation',
                debouncedValues[field],
                debouncedValues['password'],
              )
            : getErrorMessage('password', debouncedValues[field]);
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
      }
    });
  }, [...fields.map((f) => debouncedValues[f])]);
};
