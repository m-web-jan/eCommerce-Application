import styled from 'styled-components';

const ButtonField = styled.button`
  background-color: black;
  padding: 5px 32px;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid black;
  @media (hover: hover) {
    &:hover {
      background-color: white;
      color: black;
      transition: 0.3s;
    }
  }
`;

export const RoundedButton = ({ ...props }) => {
  return (
    <ButtonField id={props.id} type={props.type} onClick={props.onClick} disabled={props.disabled}>
      {props.text}
    </ButtonField>
  );
};
