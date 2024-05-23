import { publicInstance } from ".";
import { INewCustomer } from "../types";
import { getAuthToken } from "./authToken"

export const registration = async (newUserRequestData: INewCustomer) => {
  const authToken = await getAuthToken();

  const response = await publicInstance.post(
    '/me/signup',
    newUserRequestData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
  });

  return response.data;
}