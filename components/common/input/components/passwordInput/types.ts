import { ChangeEvent, FocusEvent } from 'react';

export interface passwordInputProps {
  id: string;
  label?: string;
  hasLabel: boolean;
  value: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errorMessage: string | undefined;
  placeholder: string;
}
