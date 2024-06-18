import styled from 'styled-components';

export const About = styled.div`
  padding: 1rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }
`;

export const PersonalInfo = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    margin-top: 20px;
  }
  .content {
    h2 {
      font-size: 4rem;
    }
    h3 {
      font-size: 2rem;
      span {
        color: #fcc022;
      }
    }
    p {
      margin-top: 1rem;
      font-size: 1rem;
      color: gray;
    }
    a {
      color: white;
      font-size: 1rem;
      padding: 0.5rem 0;
      background-color: #fcc022;
      margin-top: 1rem;
      display: block;
      max-width: 100px;
      text-align: center;
      text-decoration: none;
      border-radius: 50px;
      @media (hover: hover) {
        &:hover {
          background-color: #d29f1e;
        }
      }
    }
  }
  img {
    width: 400px;
    @media (max-width: 768px) {
      width: 80%;
    }
  }
`;

export const Courses = styled.div`
  margin-top: 3rem;
  .row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    text-transform: uppercase;
    align-items: end;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: start;
    }
    img {
      padding-bottom: 1rem;
      width: 195px;
    }
    p {
      padding: 0.5rem 0;
      color: gray;
      font-size: 1.2rem;
    }
  }
  h2 {
    padding: 1.5rem 0;
  }
  ul {
    margin-top: 1rem;
    list-style-position: inside;
  }
  margin-bottom: 100px;
`;
