import { Link } from "react-router-dom";
import { NavBarField } from "./style";

export const NavBar = () => {
  return (
    <NavBarField>
      <Link to={'/'}>Main</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Register</Link>
    </NavBarField>
  );
};
