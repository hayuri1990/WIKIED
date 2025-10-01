import { getErrorMessage, InputId, UseFormProps } from '@/types/authUtils';
import { ChangeEvent, FocusEvent } from 'react';

export const useForm = <T extends Record<string, string | undefined>>({
  formState,
  setFormState,
  setErrors,
  passwordFieldKey,
}: UseFormProps<T>) => {
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
      id as InputId,
      value,
      formState[passwordFieldKey],
    );
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
  };

  const validateForm = (
    fields: (keyof T)[],
  ): Record<string, string | undefined> => {
    const newErrors: Record<string, string | undefined> = {};
    fields.forEach((field) => {
      newErrors[field as string] = getErrorMessage(
        field as InputId,
        formState[field] ?? '',
        formState[passwordFieldKey] ?? '',
      );
    });
    setErrors(newErrors);
    return newErrors;
  };

  return { handleChange, handleBlur, validateForm };
};
