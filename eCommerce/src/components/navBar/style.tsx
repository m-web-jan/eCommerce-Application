import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBarField = styled.nav`
  background-color: black;
  display: flex;
  justify-content: center;
  column-gap: 2rem;
  padding: 0 2rem;
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
