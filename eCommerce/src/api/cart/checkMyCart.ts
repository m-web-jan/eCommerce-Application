import { publicInstance } from '..';
import { getCookie } from '../cookie';

export const checkExistMyCarts = async () => {
  let token = getCookie('emailToken');
  if(!token) token = getCookie('anonymousToken');
  const { data } = await publicInstance.get(`/me/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.total;
};