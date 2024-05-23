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

export const Select = ({ ...props }) => {
  return (
    <SelectField
      id={props.id}
      disabled={props.disabled}
      required={props.required}
      onChange={props.onChange}
      value={props.value}
    >
      {props.children}
    </SelectField>
  );
};
