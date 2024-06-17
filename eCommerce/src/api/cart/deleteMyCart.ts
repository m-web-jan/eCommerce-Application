import { publicInstance } from '..';
import { getCookie } from '../cookie';
import { createMyCart } from './createMyCart';

export const deleteMyCart = async (cartId: string, myCartVersion: string) => {
  const mailToken = getCookie('emailToken');
  const { data } = await publicInstance.delete(`/me/carts/${cartId}`, {
    params: {
      version: myCartVersion,
    },
    headers: {
      Authorization: `Bearer ${mailToken}`,
    },
  });
  await createMyCart();
  return data;
};
