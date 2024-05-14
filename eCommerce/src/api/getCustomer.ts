import { getCookie } from './cookie';
import { publicInstance } from './index';

export const getCustomer = async () => {
  const authToken = getCookie('emailToken');

  const response = await publicInstance.get('/me', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
