export async function checkItemInCart(productId: string, cart: any) {
  const foundItem = cart?.lineItems?.find((item: any) => item.productId === productId);
  return foundItem ? { exists: true, itemId: foundItem.id } : { exists: false, itemId: null };
}

