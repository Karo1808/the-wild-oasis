import { forwardRef } from "react";
import styled from "styled-components";

interface Props {
  id: string;
  defaultValue: string;
}

const StyledTextarea = styled.textarea<Props>`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;
`;

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { id, ...rest } = props;
  return <StyledTextarea ref={ref} id={id} {...rest} />;
});

export default Textarea;
