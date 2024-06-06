import { publicInstance } from ".";
import { getAuthToken } from "./authToken";

const CTP_PROJECT_KEY = import.meta.env.VITE_REACT_CTP_PROJECT_KEY;
const CTP_API_URL = import.meta.env.VITE_REACT_CTP_API_URL;

export const getProductsByCategory = async (categoryId: string) => {
  const authToken = await getAuthToken();

  const response = await publicInstance.get(
    `${CTP_API_URL}/${CTP_PROJECT_KEY}/products`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        where: `masterData(current(categories(id="${categoryId}")))`,
      },
  });

  return response.data.results;
}
