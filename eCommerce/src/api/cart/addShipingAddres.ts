import { publicInstance } from '..';
import { getCookie } from '../cookie';

export const addShipingAdress = async (adress: string, cartId: string, cartVersion: string | number) => {
  let token = getCookie('emailToken');
  if (!token) token = getCookie('anonymousToken');

  const { data } = await publicInstance.post(
    `/me/carts/${cartId}`,
    {
      version: cartVersion,
      actions: [
        {
          action: 'setShippingAddress',
          address: adress,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
