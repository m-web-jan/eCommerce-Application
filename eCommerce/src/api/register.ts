import { publicInstance } from ".";
import { ICustomerDraft } from "../types";
import { getAuthToken } from "./authToken"

export const registration = async (newUserRequestData: ICustomerDraft) => {
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