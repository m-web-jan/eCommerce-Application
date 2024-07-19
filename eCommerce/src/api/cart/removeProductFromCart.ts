import { publicInstance } from '..';
import { getCookie } from '../cookie';

export type IRemoveProduct = {
  cartId: string | undefined;
  lineItemId: string | undefined;
  cartVersion: number | undefined;
};

export const removeProduct = async (cartId: string, lineItemId: string, cartVersion: string | number) => {
  let token = getCookie('emailToken');
  if(!token) token = getCookie('anonymousToken');
  const { data } = await publicInstance.post(
    `/me/carts/${cartId}`,
    {
      version: cartVersion,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: `${lineItemId}`,
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
