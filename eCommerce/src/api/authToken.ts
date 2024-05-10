import { getCookie, setCookie } from './cookie';
import { authInstance } from './index';

const CTP_CLIENT_ID = import.meta.env.VITE_REACT_CTP_CLIENT_ID;
const CTP_CLIENT_SECRET = import.meta.env.VITE_REACT_CTP_CLIENT_SECRET;

export const getAuthToken = async () => {
  const accessToken = getCookie('accessToken');
  console.log(`value - ${accessToken}`);
  if (!accessToken) {
    const { data } = await authInstance.post(
      '/token',
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
    setCookie('accessToken', data.access_token, data.expires_in);
    return data.access_token;
  }
  return accessToken;
};
