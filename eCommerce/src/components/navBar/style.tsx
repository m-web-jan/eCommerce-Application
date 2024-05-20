import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  background-color: black;
`;
export const Container = styled.div`
  padding: 0 2rem;
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: black;
`;

export const LogoutButton = styled.div`
  cursor: pointer;
  display: flex;
  column-gap: 5px;
  text-decoration: none;
  color: white;
  align-self: center;
  h2 {
    align-self: center;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
`;
export const StyledLogo = styled(Link)`
  display: flex;
  column-gap: 5px;
  text-decoration: none;
  color: white;
  align-self: center;
  h2 {
    align-self: center;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
`;

export const NavBarField = styled.nav`
  display: flex;
  justify-content: center;
  column-gap: 2rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 1rem 0;
  color: white;
  font-size: 1.5rem;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    display: block;
    width: 0;
    height: 3px;
    background: white;
    transition: 0.3s;
    left: 50%;
    transform: translate(-50%);
  }
  &:hover:after {
    width: 100%;
  }
`;
