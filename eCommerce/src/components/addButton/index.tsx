import styled from 'styled-components';

const AddButton = styled.button`
  margin-top: 3rem;
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  background-color: white;
  border-radius: 50px;
  color: black;
  border: 2px solid white;
  transition: 0.3s;
  width: 100%;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      color: white;
      background-color: black;
      transition: 0.3s;
    }
  }
`;

export const AddCartButton = ({ ...props }) => {
  return <AddButton id={props.id} type={props.type} onClick={props.onClick} disabled={props.disabled}>{props.text}</AddButton>;
};

