import { publicInstance } from '..';
import { getCookie } from '../cookie';

export type IAddProductToCartAction = {
  productId: string;
  cartId: string;
  cartVersion: number;
};

export const addProductToMyCart = async ({
  productId,
  cartId,
  cartVersion,
}: IAddProductToCartAction) => {
  let token = getCookie('emailToken');
  if(!token) token = getCookie('anonymousToken');

  const { data } = await publicInstance.post(
    `/me/carts/${cartId}`,
    {
      version: cartVersion,
      actions: [
        {
          action: 'addLineItem',
          productId: `${productId}`,
          variantId: 1,
          quantity: 1,
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