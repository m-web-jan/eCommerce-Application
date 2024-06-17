import { getAuthToken } from "./authToken";
import { publicInstance } from ".";

export const getProductByKey = async (productKey: string) => {
  const authToken = await getAuthToken();

  const response = await publicInstance.get(
    `products/key=${productKey}`,
    {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return [response.data.masterData.current, response.data.productType.id, response.data.id];
};
