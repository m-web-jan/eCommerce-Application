import { useNavigate } from 'react-router-dom';
import {
  StyledLink,
  NavBarField,
  StyledHeader,
  Container,
  StyledLogo,
  LogoutButton,
  BurgerIcon,
  MobMenu,
  MobMenuLogo,
  StyledMobLink,
  StyledMobLogout,
} from './style';
import { delCookie, getCookie } from '../../api/cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';

export const NavBar = () => {
  const authSelector = (state: RootState) => state.auth;
  const states = useSelector((state: RootState) => authSelector(state));
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  function logoutCustomer() {
    const emailToken = getCookie('emailToken');
    if (emailToken) {
      delCookie('emailToken');
      navigate('/');
      changeState('setLogged', false);
    }
  }

  function showModal(burgerIcon: HTMLImageElement) {
    burgerIcon.src = isMenuOpen ? '../../icons/burgerMenu.png' : '../../icons/close.png';
    document.body.style.overflow = isMenuOpen ? 'visible' : 'hidden';
    setMenuOpen(!isMenuOpen);
  }

  function closeModal(element: HTMLElement) {
    const burgerIcon = document.querySelector('#burgerIcon') as HTMLImageElement;
    if (!element.classList.contains('content') && isMenuOpen) showModal(burgerIcon);
  }

  return (
    <StyledHeader>
      <Container>
        <StyledLogo to={'/'}>
          <img src="../../icons/lightCart.png" alt="logoIcon" />
          <h2>eComm</h2>
        </StyledLogo>
        <NavBarField>
          <StyledLink to={'/'}>Main</StyledLink>
          <StyledLink hidden={states.isLogged} to={'/login'}>Login</StyledLink>
          <StyledLink hidden={states.isLogged} to={'/register'}>Register</StyledLink>
          <StyledLink hidden={!states.isLogged} to={'/catalog'}>Catalog</StyledLink>
          <StyledLink hidden={!states.isLogged} to={'/profile'}>Profile</StyledLink>
        </NavBarField>
        <LogoutButton onClick={logoutCustomer}>
          <img src="../../icons/logout.png" alt="logoutIcon" />
          <h2>Logout</h2>
        </LogoutButton>
        <BurgerIcon
          id='burgerIcon'
          onClick={(e) => {
            showModal(e.target as HTMLImageElement);
          }}
          src="../../icons/burgerMenu.png"
        ></BurgerIcon>
      </Container>

      <MobMenu onClick={(e) => {closeModal(e.target as HTMLElement)}} className={isMenuOpen ? 'open' : 'close'}>
        <div className="content">
          <MobMenuLogo to={'/'}>
            <img src="../../icons/lightCart.png" alt="logoIcon" />
            <h2>eComm</h2>
          </MobMenuLogo>
          <div className="mob-menu__links">
            <StyledMobLink to={'/'}>
              Main
              <img src="../../icons/arrow.png" alt="arrowIcon" />
            </StyledMobLink>
            <StyledMobLink to={'/login'}>
              Login
              <img src="../../icons/arrow.png" alt="arrowIcon" />
            </StyledMobLink>
            <StyledMobLink to={'/register'}>
              Register
              <img src="../../icons/arrow.png" alt="arrowIcon" />
            </StyledMobLink>
          </div>
          <StyledMobLogout onClick={logoutCustomer}>
            <img src="../../icons/logout.png" alt="logoutIcon" />
            <p>Logout</p>
          </StyledMobLogout>
        </div>
      </MobMenu>
    </StyledHeader>
  );
};
