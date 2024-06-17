import { publicInstance } from '..';
import { getAnonymousToken } from '../anonymousToken';
import { getCookie } from '../cookie';

export const createMyCart = async () => {
  let token = getCookie('emailToken');
  if (!token) {
    token = await getAnonymousToken();
  }
  const { data } = await publicInstance.post(
    `/me/carts`,
    { currency: 'BYN' },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
