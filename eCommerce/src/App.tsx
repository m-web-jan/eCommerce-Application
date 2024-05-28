import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { MainPage } from './pages/main';
import { NavBar } from './components/navBar';
import { RegisterPage } from './pages/registerPage';
import { NotFound } from './pages/notFound';
import './App.css';
import { CatalogPage } from './pages/catalog';
import { ProfilePage } from './pages/profile';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
