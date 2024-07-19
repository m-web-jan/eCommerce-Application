import { addProductToMyCart } from "../../api/cart/addProductToMyCart";
import { getMyActiveCart } from "../../api/cart/getMyActiveCart";

export async function addItem(e: Event, productId: string, dispatch: any) {
  e.preventDefault();

  const cartData = await getMyActiveCart();
  await addProductToMyCart({
    productId: productId,
    cartId: cartData.id,
    cartVersion: cartData.version,
  });

  dispatch({ type: 'addItem', payload: 1 });
}
