import styled from 'styled-components';

export const StyledFooter = styled.footer`
  width: 100%;
  background-color: black;
  .container {
    max-width: 70rem;
    margin: 0 auto;
    text-align: center;
    padding: 1rem 0;
    .logo {
      font-size: 40px;
      color: white;
    }
    .social {
      display: flex;
      column-gap: 10px;
      justify-content: center;
      margin: 1rem 0;
      img {
        width: 30px;
      }
    }
    .bio {
      font-size: 12px;
      color: white;
    }
  }
`;
