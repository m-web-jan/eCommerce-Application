import { publicInstance } from '..';
import { getCookie } from '../cookie';

export const changeProductCount = async (
  cartId: string,
  lineItemId: string,
  cartVersion: string | number,
  newQuantity: string | number,
) => {
  let token = getCookie('emailToken');
  if(!token) token = getCookie('anonymousToken');

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
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};