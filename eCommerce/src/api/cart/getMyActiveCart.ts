import { publicInstance } from '..';
import { createMyCart } from './createMyCart';
import { getCookie } from '../cookie';
import { checkExistMyCarts } from './checkMyCart';

export const getMyActiveCart = async () => {
  const mailToken = getCookie('emailToken');

  const check = await checkExistMyCarts();
  if (!check) {
    await createMyCart();
  }
  const { data } = await publicInstance.get(`/me/active-cart`, {
    headers: {
      Authorization: `Bearer ${mailToken}`,
    },
  });
  return data;
};