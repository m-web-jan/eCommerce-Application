import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { MainPage } from './pages/main';
import { NavBar } from './components/navBar';
import { RegisterPage } from './pages/registerPage';
import { NotFound } from './pages/notFound';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getAuthToken } from './api/authToken';
import { fetchMeCustomer } from './slices/users/usersSlice';
import { getCookie } from './api/cookie';

function App() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.users);

  useEffect(() => {
    getAuthToken();
    const mailToken = getCookie('mail_token');
    if (mailToken) {
      dispatch(fetchMeCustomer());
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
