import { publicInstance } from '.';
import { IRequestData } from '../components/userPageContainer/updateData';
import { getCookie } from './cookie';

const CTP_PROJECT_KEY = import.meta.env.VITE_REACT_CTP_PROJECT_KEY;
const CTP_API_URL = import.meta.env.VITE_REACT_CTP_API_URL;

export const updateCustomerData = async (
  id: string,
  requestData: IRequestData,
) => {
  const emailToken = getCookie('emailToken');

  const response = await publicInstance.post(
    `${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/${id}`,
    requestData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${emailToken}`,
      },
    }
  );

  return response.data;
};
