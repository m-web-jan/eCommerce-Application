import styled from 'styled-components';

export const About = styled.div`
 @media (max-width: 768px) {
   padding: 1rem;
 }
  max-width: 90rem;
  margin: 0 auto;
  .title {
    font-size: 2rem;
    text-align: center;
    border-bottom: 2px solid black;
    padding-bottom: 20px;
  }
  .main {
    @media (max-width: 768px) {
      flex-direction: column;
      padding: 0;
      img {
        width: 100% !important;
        margin-top: 1rem;
      }
      .content {
        h2 {
          font-size: 1.5rem !important;
        }
      }
    }
    margin-top: 1.5rem;
    display: flex;
    column-gap: 3rem;
    padding: 0 1.5rem;
    .content {
      h2 {
        font-size: 2rem;
        margin-bottom: 10px;
        max-width: 500px;
      }
    }
    img {
      width: 50%;
      align-self: start;
    }
  }
  .workHours {
    @media (max-width: 768px) {
      flex-direction: column-reverse;
      align-items: center;
      img {
        align-self: center !important;
        margin-top: 1.5rem;
      }
    }
    display: flex;
    background-color: black;
    color: white;
    border-radius: 10px;
    margin: 2rem 0;
    padding: 1.5rem;
    column-gap: 3rem;
    justify-content: center;
    img {
      width: 225px;
      align-self: start;
    }
  }
  .map {
    h2 {
      font-size: 2rem;
      @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
    }
    iframe {
      border: 0;
      width: 100%;
    }
  }
`;
