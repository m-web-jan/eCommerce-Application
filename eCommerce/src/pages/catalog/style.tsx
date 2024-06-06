import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Catalog = styled.div<{ isOpen: boolean }>`
  .container {
    padding: 0 2rem;
    max-width: 90rem;
    margin: 0 auto;
    margin-left: 250px;
    .categories {
      cursor: pointer;
      display: none;
      margin-top: 20px;
      border-radius: 50px;
      padding: 5px 15px;
      background-color: black;
      color: white;
      max-width: 100px;
      text-align: center;
      margin-left: auto;
    }
    @media (max-width: 767px) {
      .categories {
        display: block;
      }
      margin-left: ${(props) => (props.isOpen ? '-252px' : '0')};
    }
    h1 {
      margin-top: 3rem;
      font-size: 40px;
      text-transform: uppercase;
      font-style: italic;
      @media (max-width: 767px) {
        font-size: 30px;
      }
    }
    p {
      font-size: 1rem;
      max-width: 57rem;
      margin-bottom: 3rem;
    }
  }
`;

export const CatalogCards = styled.div`
  margin-bottom: 2rem;
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CatalogMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 99;
  background-color: black;
  width: 220px;
  padding: 1rem 1rem;
  height: 100vh;
  top: 0;
  transition: 0.3s;
  p {
    color: gray;
    font-size: 1.2rem;
  }
  ul {
    list-style: none;
    padding: 1rem 0 0 1rem;
    display: flex;
    flex-direction: column;
    column-gap: 0.5rem;
    li {
      cursor: pointer;
      color: white;
      font-size: 1.5rem;
    }
  }
  @media (max-width: 767px) {
    left: ${(props) => (props.isOpen ? '0' : '-252px')};
  }
`;

export const MenuLogo = styled(Link)`
  display: flex;
  column-gap: 5px;
  text-decoration: none;
  color: white;
  align-self: center;
  justify-content: center;
  margin-bottom: 3rem;
  h2 {
    align-self: center;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
`;
