import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { MainPage } from './pages/main';
import { NavBar } from './components/navBar';
import { RegisterPage } from './pages/registerPage';
import { NotFound } from './pages/notFound';
import './app.css'
import { getAuthToken } from './api/authToken';

function App() {

  const getToken = async () => {
    const token = await getAuthToken();
    console.log(token);
  }
  return (
    <div>
      <NavBar />
      <button onClick={getToken}>get token</button>
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
