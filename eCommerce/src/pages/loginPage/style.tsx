import styled from "styled-components";

export const FormField = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  padding: 2rem 1rem;
  border: 1px solid black;
  margin: 8rem auto;
  input:not([type=checkbox]) {
    margin-top: 1rem;
  }
  button {
    margin-top: 1rem;
  }
`

export const ErrorMsg = styled.span`
  color: red;
  font-size: 0.8rem;
`

export const Label = styled.label`
  display: flex;
  column-gap: 0.5rem;
  user-select: none;
  cursor: pointer;
`