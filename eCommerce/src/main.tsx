import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { getAuthToken } from './api/authToken.ts';
import { getCookie } from './api/cookie.ts';
// import { Provider } from 'react-redux';

const RootComponent = () => {
  useEffect(() => {
    getAuthToken();
    const mailToken = getCookie('emailToken');
    console.log(mailToken);
  }, []);

  return (
    <React.StrictMode>
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </Provider> */}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootComponent />
);