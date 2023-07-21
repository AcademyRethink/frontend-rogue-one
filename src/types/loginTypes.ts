import { ChangeEvent, FocusEvent, ReactNode } from 'react';


interface TitleSubtitleProps {
    title: string;
    subtitle?: string | ReactNode;
}

interface ButtonLoginProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    title: string;
  }

  interface InputWithLabelProps {
    title: string;
    type: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    required?: boolean;
    autoComplete: string;
  }


export type { TitleSubtitleProps, ButtonLoginProps, InputWithLabelProps };