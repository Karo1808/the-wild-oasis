import styled, { css } from "styled-components";

interface Props {
  type?: string;
  onSubmit?: (e: React.ChangeEvent) => void;
}

const Form = styled.form<Props>`
  ${(props) =>
    props.type !== "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
