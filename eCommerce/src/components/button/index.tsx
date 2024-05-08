import styled from 'styled-components';

const ButtonField = styled.button`
  cursor: pointer;
  padding: 0.5rem 3rem;
  font-size: 1rem;
  background-color: white;
  outline: none;
  border: 1px solid black;
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
`;

export const Button = ({ ...props }) => {
  return <ButtonField type={props.type} onClick={props.onClick}>{props.text}</ButtonField>;
};

