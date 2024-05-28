import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { MainPage } from './pages/main';
import { NavBar } from './components/navBar';
import { RegisterPage } from './pages/registerPage';
import { NotFound } from './pages/notFound';
import './App.css';
import { CatalogPage } from './pages/catalog';
import { ProfilePage } from './pages/profile';
import { getCookie } from './api/cookie';
import { useDispatch } from 'react-redux';

const links = [
  { path: '/', element: <MainPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/catalog', element: <CatalogPage /> },
  { path: '*', element: <NotFound /> },
];

function App() {
  const dispatch = useDispatch();
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }

  const emailToken = getCookie('emailToken');
  if (emailToken) {
    changeState('setLogged', true);
  }

  return (
    <div>
      <NavBar />
      <Routes>
        {links.map((link, index) => (
          <Route key={index} path={link.path} element={link.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
