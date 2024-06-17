import { publicInstance } from '..';
import { getCookie } from '../cookie';

export type IRemoveProduct = {
  cartId: string | undefined;
  lineItemId: string | undefined;
  cartVersion: number | undefined;
};

export const removeProduct = async (cartId: string, lineItemId: string, cartVersion: string | number) => {
  const mailToken = getCookie('emailToken');
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
        Authorization: `Bearer ${mailToken}`,
      },
    }
  );
  return data;
};
