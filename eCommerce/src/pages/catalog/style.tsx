import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Catalog = styled.div`
  .container {
    padding: 0 2rem;
    max-width: 90rem;
    margin: 0 auto;
    margin-left: 250px;
    h1 {
      margin-top: 3rem;
      font-size: 40px;
      text-transform: uppercase;
      font-style: italic;
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

export const CatalogMenu = styled.div`
  position: fixed;
  background-color: black;
  width: 220px;
  padding: 1rem 1rem;
  height: 100vh;
  top: 0;
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
