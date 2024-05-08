import { StyledLink, NavBarField } from './style';

export const NavBar = () => {
  return (
    <NavBarField>
      <StyledLink to={'/'}>Main</StyledLink>
      <StyledLink to={'/login'}>Login</StyledLink>
      <StyledLink to={'/register'}>Register</StyledLink>
    </NavBarField>
  );
};
