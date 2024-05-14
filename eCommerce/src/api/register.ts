import { publicInstance } from '.';
import { INewCustomer } from '../types';
import { getAuthToken } from './authToken';
import { getEmailToken } from './emailToken';

export const registration = async (newUserRequestData: INewCustomer) => {
  const authToken = await getAuthToken();

  const response = await publicInstance.post('/me/signup', newUserRequestData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { email, password } = newUserRequestData;
  getEmailToken(email, password);

  return response.data;
};
