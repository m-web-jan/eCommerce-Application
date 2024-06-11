import { getCookie, setCookie } from './cookie';
import { authInstance } from './index';

const CTP_CLIENT_ID = import.meta.env.VITE_REACT_CTP_CLIENT_ID;
const CTP_CLIENT_SECRET = import.meta.env.VITE_REACT_CTP_CLIENT_SECRET;
const CTP_AUTH_URL = import.meta.env.VITE_REACT_CTP_AUTH_URL;
const CTP_PROJECT_KEY = import.meta.env.VITE_REACT_CTP_PROJECT_KEY;

export const getAnonymousToken = async () => {
  const anonymousToken = getCookie('anonymousToken');

  if (!anonymousToken) {
    const { data } = await authInstance.post(
      `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token`,
      {},
      {
        params: {
          grant_type: 'client_credentials',
        },
        auth: {
          username: `${CTP_CLIENT_ID}`,
          password: `${CTP_CLIENT_SECRET}`,
        },
      }
    );
    setCookie('anonymousToken', data.access_token, data.expires_in);
    return data.access_token;
  }
  return anonymousToken;
};
