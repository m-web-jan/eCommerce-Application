import { publicInstance } from '..';
import { getCookie } from '../cookie';

export const changeProductCount = async (
  cartId: string,
  lineItemId: string,
  cartVersion: string | number,
  newQuantity: string | number,
) => {
  const mailToken = getCookie('emailToken');
  const { data } = await publicInstance.post(
    `/me/carts/${cartId}`,
    {
      version: cartVersion,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: `${lineItemId}`,
          quantity: newQuantity,
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