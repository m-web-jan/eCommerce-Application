import { getAuthToken } from './authToken';
import { authInstance } from './index';

const CTP_API_URL = import.meta.env.VITE_REACT_CTP_API_URL;
const CTP_PROJECT_KEY = import.meta.env.VITE_REACT_CTP_PROJECT_KEY;

export const getTypeById = async (productId: string) => {
  const authToken = await getAuthToken();

  const { data } = await authInstance.get(
    `${CTP_API_URL}/${CTP_PROJECT_KEY}/product-types/${productId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data.name;
};
