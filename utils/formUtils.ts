export const withValidation =
  <T>(
    validateForm: (fields: (keyof T)[]) => Record<string, string | undefined>,
    fields: (keyof T)[],
  ) =>
  async (onValid: () => Promise<void> | void) => {
    const newErrors = validateForm(fields);
    const isValid = Object.values(newErrors).every((err) => !err);
    if (!isValid) return;
    await onValid();
  };
