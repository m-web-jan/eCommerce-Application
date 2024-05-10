import styled from 'styled-components';

const InputField = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: lightgray;
  outline: none;
  border: 1px solid lightgray;
  &:focus {
    border-color: black;
  }
`;

export const Input = ({ ...props }) => {
  return (
    <InputField
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      checked={props.checked}
      required={props.required}
      id={props.id}
    />
  );
};
