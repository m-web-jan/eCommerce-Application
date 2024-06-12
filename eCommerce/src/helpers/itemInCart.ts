import { getMyActiveCart } from '../api/cart/getMyActiveCart';

let cart: any;
let gotCart = false;

export async function checkItemInCart(productId: string) {
  if (!gotCart) {
    gotCart = true;
    cart = await getMyActiveCart();
  }
  console.log(productId);
}
