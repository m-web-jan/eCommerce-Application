import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FormField = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  padding: 2rem 1rem;
  border: 1px solid black;
  margin: 3rem auto 3rem auto;
  input:not([type='checkbox']) {
    margin-top: 1rem;
  }
  button {
    margin-top: 1rem;
    color: black;
  }
  h2 {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`;

export const TwoInRow = styled.div`
  display: flex;
  justify-content: space-between;
  & input, & p {
    width: 134px;
    margin-top: 1rem;
    align-self: center;
  }
  & select {
    width: 152px;
    font-size: 0.85rem;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #990000;
  margin-left: 0.5rem;
`;

export const ErrorMsg = styled.div`
  display: flex;
  flex-direction: column;
  color: red;
  font-size: 0.8rem;
`;

export const Label = styled.label`
  display: flex;
  column-gap: 0.5rem;
  user-select: none;
  cursor: pointer;
  margin-top: 0.5rem;
`;
