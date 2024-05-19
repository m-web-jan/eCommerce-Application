import { publicInstance } from ".";
import { ICustomer } from "../types";
import { getAuthToken } from "./authToken"

export const login = async (userRequestData: ICustomer) => {
  const authToken = await getAuthToken();

  const response = await publicInstance.post(
    '/me/login',
    userRequestData,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
  });

  return response.data;
}