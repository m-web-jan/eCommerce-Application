import styled from 'styled-components';

export const UserPageStyled = styled.div`
  max-width: 600px;
  padding: 3rem 2rem;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const StyledTitle = styled.h2`
  font-size: 26px;
`;
export const StyledText = styled.p`
  font-size: 16px;
  color: gray;
  margin-bottom: 8px;
`;

export const ContentBlock = styled.div`
  font-size: 26px;
  padding: 1.5rem 1rem;
  box-shadow: 2.5px 2.5px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 2rem;
  .row {
    @media (max-width: 768px) {
      &:not(:nth-child(1)) {
        flex-direction: column;
      }
    }
    display: flex;
    column-gap: 2rem;
    &:not(:nth-child(1)) {
      justify-content: space-between;
    }
    img {
      width: 80px;
      align-self: center;
    }
    .content {
      label {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        font-size: 1rem;
      }
      input,
      select {
        padding: 5px 10px;
        outline: none;
        min-width: 220px;
        @media (max-width: 768px) {
          min-width: 120px;
        }
      }
    }
  }
  .error {
    color: red;
    font-size: 0.8rem;
    max-width: 220px;
  }
  .top-row {
    display: flex;
    justify-content: space-between;
    button {
      align-self: flex-end;
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
    }
    label {
      min-width: 220px;
      display: flex;
      column-gap: 5px;
      font-size: 1rem;
      align-self: flex-end;
      cursor: pointer;
      padding-right: 20px;
      user-select: none;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      label {
        align-self: auto;
        padding: 0;
      }
    }
  }
`;
