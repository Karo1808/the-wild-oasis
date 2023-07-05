import styled from "styled-components";

interface StyledSelect {
  type?: string;
  value?: string;
}

const StyledSelect = styled.select<StyledSelect>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent) => void;
}

const Select = ({ options, value, type, onChange }: SelectProps) => {
  return (
    <StyledSelect type={type} onChange={onChange} value={value}>
      {options.map((option: Option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        );
      })}
    </StyledSelect>
  );
};

StyledSelect.defaultProps = {
  type: "",
};

export default Select;
