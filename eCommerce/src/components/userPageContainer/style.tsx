import styled from 'styled-components';

export const UserPageStyled = styled.div`
  max-width: 600px;
  padding: 3rem 2rem;
  margin: 0 auto;
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
      input, select {
        padding: 5px 10px;
        outline: none;
        min-width: 220px;
      }
    }
  }
  .main-address {
    display: flex;
    justify-content: space-between;
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
  }
`;