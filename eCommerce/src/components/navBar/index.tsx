import { useNavigate } from 'react-router-dom';
import { StyledLink, NavBarField, StyledHeader, Container, StyledLogo, LogoutButton } from './style';
import { delCookie, getCookie } from '../../api/cookie';

export const NavBar = () => {
  const navigate = useNavigate();
  function logoutCustomer() {
    const emailToken = getCookie('emailToken');
    if (emailToken) {
      delCookie('emailToken');
      navigate('/');
    }
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
          <StyledLink to={'/login'}>Login</StyledLink>
          <StyledLink to={'/register'}>Register</StyledLink>
        </NavBarField>
        <LogoutButton onClick={logoutCustomer}>
          <img src="../../icons/logout.png" alt="logoutIcon" />
          <h2>Logout</h2>
        </LogoutButton>
      </Container>
    </StyledHeader>
  );
};
