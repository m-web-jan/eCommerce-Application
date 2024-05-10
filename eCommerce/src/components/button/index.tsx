import styled from 'styled-components';

const ButtonField = styled.button`
  cursor: pointer;
  padding: 0.5rem 3rem;
  font-size: 1rem;
  background-color: white;
  outline: none;
  border: 2px solid black;
  transition: .3s;
  width: fit-content;
  margin: 0 auto;
  &:hover {
    background-color: black;
    color: white;
    transition: .3s;
  }
  &:active {
    background-color: gray;
  }
  &:disabled {
    color: black;
    pointer-events: none;
  }
`;

export const Button = ({ ...props }) => {
  return <ButtonField id={props.id} type={props.type} onClick={props.onClick} disabled={props.disabled}>{props.text}</ButtonField>;
};

