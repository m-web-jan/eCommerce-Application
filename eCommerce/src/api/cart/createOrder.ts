import { publicInstance } from '..';
import { getCookie } from '../cookie';

export const createOrder = async (cartId: string, cartVersion: string) => {
  let token = getCookie('emailToken');
  if (!token) token = getCookie('anonymousToken');

  const { data } = await publicInstance.post(
    `/orders`,
    {
      cart : {
        id : `${cartId}`,
        typeId : "cart"
      },
      version: cartVersion,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
