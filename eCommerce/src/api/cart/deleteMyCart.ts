import { publicInstance } from '..';
import { getCookie } from '../cookie';
import { createMyCart } from './createMyCart';

export const deleteMyCart = async (cartId: string, myCartVersion: string) => {
  let token = getCookie('emailToken');
  if(!token) token = getCookie('anonymousToken');
  const { data } = await publicInstance.delete(`/me/carts/${cartId}`, {
    params: {
      version: myCartVersion,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await createMyCart();
  return data;
};
