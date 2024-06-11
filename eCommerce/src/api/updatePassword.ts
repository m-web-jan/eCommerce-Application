import { publicInstance } from '.';
import { passwordRequestData } from '../components/userPageContainer/changrPassword';
import { getCookie } from './cookie';

const CTP_PROJECT_KEY = import.meta.env.VITE_REACT_CTP_PROJECT_KEY;
const CTP_API_URL = import.meta.env.VITE_REACT_CTP_API_URL;

export const updatePassword = async (requestData: passwordRequestData) => {
  const emailToken = getCookie('emailToken');

  const response = await publicInstance.post(
    `${CTP_API_URL}/${CTP_PROJECT_KEY}/customers/password`,
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
