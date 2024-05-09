import styled from 'styled-components';

const SelectField = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: lightgray;
  outline: none;
  border: 1px solid lightgray;
  height: 36px;
  margin-top: 1rem;
  &:focus {
    border-color: black;
  }
`;

interface SelectProps {
  id?: string;
  required?: boolean;
  children?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, id, required }) => {
  return (
    <SelectField
    id={id}
    required={required}
    >
      {children}
    </SelectField>
  );
};
