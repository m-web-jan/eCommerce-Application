import { addProductToMyCart } from "../../api/cart/addProductToMyCart";
import { getMyActiveCart } from "../../api/cart/getMyActiveCart";

export async function addItem(e: Event, productId: string) {
  e.preventDefault();

  const cartData = await getMyActiveCart();
  const addData = await addProductToMyCart({
    productId: productId,
    cartId: cartData.id,
    cartVersion: cartData.version,
  });
  console.log(addData);
}
