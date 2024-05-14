import { publicInstance } from '.';
// import { ICustomer } from '../types';
import { getAuthToken } from './authToken';

type LoginData = { username: string; password: string };

export const login = async (loginData: LoginData) => {
  const authToken = await getAuthToken();

  const { data } = await publicInstance.post(
    '/me/login',
    {
      email: loginData.username,
      password: loginData.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return data;
};
