import { publicInstance } from '..';
import { createMyCart } from './createMyCart';
import { getCookie } from '../cookie';
import { checkExistMyCarts } from './checkMyCart';

export const getMyActiveCart = async () => {
  let token = getCookie('emailToken');
  const check = await checkExistMyCarts();
  if (!check) {
    await createMyCart();
  }
  if(!token) token = getCookie('anonymousToken');
  const { data } = await publicInstance.get(`/me/active-cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};