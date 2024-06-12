import { publicInstance } from '..';
import { getCookie } from '../cookie';

export const checkExistMyCarts = async () => {
  const mailToken = getCookie('emailToken');
  const { data } = await publicInstance.get(`/me/carts`, {
    headers: {
      Authorization: `Bearer ${mailToken}`,
    },
  });
  return data.total;
};