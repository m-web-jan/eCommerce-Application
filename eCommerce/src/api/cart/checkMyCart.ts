import { publicInstance } from '..';
import { getAnonymousToken } from '../anonymousToken';
import { getCookie } from '../cookie';

export const checkExistMyCarts = async () => {
  let token = getCookie('emailToken');
  if(!token) token = await getAnonymousToken();
  const { data } = await publicInstance.get(`/me/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.total;
};