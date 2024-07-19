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
  CartButton,
} from './style';
import { delCookie, getCookie } from '../../api/cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';

export const NavBar = () => {
  const cartSelector = (state: RootState) => state.cart;
  const cartStates = useSelector((state: RootState) => cartSelector(state));
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

  const links = [
    { to: '/', text: 'Главная', hidden: false },
    { to: '/catalog', text: 'Каталог', hidden: false },
    { to: '/aboutus', text: 'О нас', hidden: false },
    { to: '/profile', text: 'Профиль', hidden: !states.isLogged },
    { to: '/login', text: 'Войти', hidden: states.isLogged },
    { to: '/register', text: 'Регистрация', hidden: states.isLogged },
  ];

  return (
    <StyledHeader>
      <Container>
        <StyledLogo to={'/'}>
          <img src="../../icons/lightLogo.png" alt="logoIcon" />
          <h2>MotoMax</h2>
        </StyledLogo>
        <NavBarField>
          {links.map((link, index) => (
            <StyledLink key={index} hidden={!link.hidden} to={link.to}>
              {link.text}
            </StyledLink>
          ))}
        </NavBarField>
        <div className="row">
          <CartButton to={'/cart'}>
            <img src="../icons/cart.png" alt="cartIcon" />
            <p>{cartStates.cartItems}</p>
          </CartButton>
          <LogoutButton onClick={logoutCustomer} hidden={!states.isLogged}>
            <img src="../../icons/logout.png" alt="logoutIcon" />
            <h2>Выйти</h2>
          </LogoutButton>
          <BurgerIcon
            id="burgerIcon"
            onClick={(e) => {
              showModal(e.target as HTMLImageElement);
            }}
            src="../../icons/burgerMenu.png"
          ></BurgerIcon>
        </div>
      </Container>

      <MobMenu
        onClick={(e) => {
          closeModal(e.target as HTMLElement);
        }}
        className={isMenuOpen ? 'open' : 'close'}
      >
        <div className="content">
          <MobMenuLogo to={'/'}>
            <img src="../../icons/lightLogo.png" alt="logoIcon" />
            <h2>MotoMax</h2>
          </MobMenuLogo>
          <div className="mob-menu__links">
            {links.map((link, index) => (
              <StyledMobLink key={index} hidden={!link.hidden} to={link.to}>
                {link.text}
              </StyledMobLink>
            ))}
          </div>
          <StyledMobLogout onClick={logoutCustomer}>
            <img src="../../icons/logout.png" alt="logoutIcon" />
            <p>Выйти</p>
          </StyledMobLogout>
        </div>
      </MobMenu>
    </StyledHeader>
  );
};
