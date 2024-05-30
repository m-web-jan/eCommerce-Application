import { publicInstance } from ".";
import { getCookie } from "./cookie";

const CTP_PROJECT_KEY = import.meta.env.VITE_REACT_CTP_PROJECT_KEY;
const CTP_API_URL = import.meta.env.VITE_REACT_CTP_API_URL;

export const allProducts = async () => {
  const emailToken = getCookie('emailToken');

  const response = await publicInstance.get(
    `${CTP_API_URL}/${CTP_PROJECT_KEY}/products`,
    {
      headers: {
        Authorization: `Bearer ${emailToken}`,
      },
  });

  return response.data.results;
}