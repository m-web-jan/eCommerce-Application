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
import { ProductPage } from './pages/product';
import { CartPage } from './pages/cartPage';
import { getMyActiveCart } from './api/cart/getMyActiveCart';
import { useEffect } from 'react';
import { AboutPage } from './pages/aboutUs';
import { Footer } from './components/footer';
import { getCustomerData } from './api/getCustomerDetails';
import { addShipingAdress } from './api/cart/addShipingAddres';

const links = [
  { path: '/', element: <MainPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/catalog', element: <CatalogPage /> },
  { path: '/aboutus', element: <AboutPage /> },
  { path: '/catalog/:productKey', element: <ProductPage /> },
  { path: '*', element: <NotFound /> },
  { path: '/cart', element: <CartPage /> },
];

function App() {
  const dispatch = useDispatch();
  function changeState(type: string, value: string | boolean) {
    dispatch({ type: type, payload: value });
  }
  useEffect(() => {
    getMyActiveCart()
      .then((data1) => {
        changeState('setCartItems', data1?.lineItems?.length);
        getCustomerData()
          .then((data) => {
            addShipingAdress(data?.addresses[0], data1?.id, data1?.version).then((data) => {
            });
          })
          .catch((error) => {
            console.error('Error checking cart:', error);
          });
      })
      .catch((error) => {
        console.error('Error checking cart:', error);
      });
    const emailToken = getCookie('emailToken');
    if (emailToken) {
      changeState('setLogged', true);
    }
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Routes>
        {links.map((link, index) => (
          <Route key={index} path={link.path} element={link.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
