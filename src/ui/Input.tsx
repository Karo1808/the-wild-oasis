import { forwardRef } from "react";
import styled from "styled-components";

interface InputProps {
  type: string;
  id: string;
  defaultValue?: number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent) => void;
  disabled?: boolean;
  placeholder?: string;
}

const StyledInput = styled.input<InputProps>`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type, id, onBlur, ...rest } = props;

  return (
    <StyledInput ref={ref} type={type} id={id} onBlur={onBlur} {...rest} />
  );
});

export default Input;
