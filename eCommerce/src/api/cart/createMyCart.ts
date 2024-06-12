import { publicInstance } from '..';
import { getCookie } from '../cookie';

export const createMyCart = async () => {
  const mailToken = getCookie('emailToken');
  const { data } = await publicInstance.post(
    `/me/carts`,
    { currency: 'BYN' },
    {
      headers: {
        Authorization: `Bearer ${mailToken}`,
      },
    }
  );
  return data;
};
