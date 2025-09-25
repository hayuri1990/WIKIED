export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color:
    | 'primary'
    | 'alert'
    | 'outline'
    | 'disabled'
    | 'main-top'
    | 'main-bottom';
  size?: 'small' | 'large' | 'x-large';
  defaultPadding?: boolean;
  fullWidth?: boolean;
  alignEnd?: boolean;
  className?: string;
  trailingIcon?: React.ReactNode;
}
