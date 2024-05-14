import { getCookie, setCookie } from './cookie';
import { authInstance } from './index';

const CTP_CLIENT_ID = import.meta.env.VITE_REACT_CTP_CLIENT_ID;
const CTP_CLIENT_SECRET = import.meta.env.VITE_REACT_CTP_CLIENT_SECRET;
const CTP_PROJECT_KEY = import.meta.env.VITE_REACT_CTP_PROJECT_KEY;

export const getEmailToken = async (email: string, password: string) => {
  const mailToken = getCookie('emailToken');

  if (!mailToken) {
    const { data } = await authInstance.post(
      `${CTP_PROJECT_KEY}/customers/token`,
      {},
      {
        params: {
          grant_type: 'password',
          username: email,
          password: password,
        },
        auth: {
          username: `${CTP_CLIENT_ID}`,
          password: `${CTP_CLIENT_SECRET}`,
        },
      }
    );
    setCookie('emailToken', data.access_token, data.expires_in);
    return data;
  }
  return mailToken;
};
