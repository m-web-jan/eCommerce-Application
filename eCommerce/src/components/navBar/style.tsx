import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  background-color: black;
  .close {
    opacity: 0;
    z-index: -1;
    & > div {
      right: -100%;
      transition: right 0.3s ease-in-out;
    }
    transition: opacity 0.6s ease-in-out;
  }
  .open {
    z-index: 10;
    opacity: 1;
    & > div {
      right: 0;
      transition: right 0.3s ease-in-out;
    }
    transition: opacity 0.3s ease-in-out;
  }
`;
export const Container = styled.div`
  padding: 0 2rem;
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: black;
  .row {
    display: flex;
    column-gap: 1rem;
  }
`;
export const LogoutButton = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  cursor: pointer;
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
  @media (max-width: 999px) {
    display: none;
  }
`;
export const CartButton = styled(Link)`
  display: flex;
  align-self: center;
  position: relative;
  img {
    width: 2rem;
    height: 2rem;
  }
  p {
    text-decoration: none;
    color: black;
    background-color: white;
    border-radius: 25px;
    width: 20px;
    text-align: center;
    font-weight: 500;
    position: absolute;
    left: -10px;
    bottom: -5px;
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
  @media (max-width: 999px) {
    display: none;
  }
`;
export const StyledLink = styled(Link)`
  display: ${(props) => (props.hidden ? 'inline' : 'none')};
  @media (hover: hover) {
    &:hover {
      color: rgb(252, 192, 34);
      transition: all.3s;
    }
  }
  transition: all.3s;
  padding: 1rem 0;
  text-decoration: none;
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
    background: rgb(252, 192, 34);
    transition: 0.3s;
    left: 50%;
    transform: translate(-50%);
  }
  @media (hover: hover) {
    &:hover:after {
      width: 100%;
    }
  }
`;
export const BurgerIcon = styled.img`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  align-self: center;
  display: none;
  z-index: 11;
  padding: 1rem 0;
  @media (max-width: 999px) {
    display: block;
  }
`;
export const MobMenu = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  .content {
    position: fixed;
    top: 0;
    width: 20rem;
    height: 100vh;
    background-color: #000000;
    color: white;
    .mob-menu__links {
      margin-top: 10rem;
      .row {
        padding: 0.75rem 1rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid white;
        img {
          width: 1.5rem;
        }
      }
    }
  }
`;
export const MobMenuLogo = styled(Link)`
  display: flex;
  column-gap: 5px;
  text-decoration: none;
  color: white;
  align-self: center;
  padding: 1rem;
  h2 {
    align-self: center;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
`;
export const StyledMobLink = styled(Link)`
  display: ${(props) => (props.hidden ? 'flex' : 'none')};
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.75rem 1rem;
  justify-content: space-between;
  border-bottom: 1px solid white;
  img {
    width: 1.5rem;
  }
`;
export const StyledMobLogout = styled.div`
  cursor: pointer;
  display: flex;
  column-gap: 5px;
  justify-content: center;
  margin-top: 3rem;
  p {
    font-size: 1.5rem;
    align-self: center;
  }
  img {
    width: 2rem;
  }
`;
